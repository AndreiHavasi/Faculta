import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    if (this.tokenService.getAccessToken() && !request.context.get(BYPASS_LOG)) {
      request = this.addTokenHeader(request, this.tokenService.getAccessToken()!);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          //this.tokenService.logout();
          return throwError(error);
        }
        else {
          return throwError(error);
        }
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
