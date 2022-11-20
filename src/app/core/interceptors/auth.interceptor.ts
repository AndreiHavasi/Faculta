import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpContextToken,
} from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    if (this.tokenService.getAccessToken() && !request.context.get(BYPASS_LOG)) {
      request = this.addTokenHeader(request, this.tokenService.getAccessToken()!);
    }
    return next.handle(request).pipe(catchError(res => {
      const message = res.error.message;
      if (res instanceof HttpErrorResponse && message === 'Invalid refresh token') {
        this.tokenService.logout();
        return throwError(message);
      } else if (res instanceof HttpErrorResponse && message === 'Invalid token')
        return this.handleRefreshToken(request, next);
      else {
        return throwError(res);
      }
    }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    return this.tokenService.refreshAccessToken().pipe(
      switchMap((res) => {
        return next.handle(this.addTokenHeader(request, res['accessToken']));
      }));
  }
}
