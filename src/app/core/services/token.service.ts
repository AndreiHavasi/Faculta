import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs/operators";

@Injectable()
export class TokenService {

  private ACCESS_TOKEN_KEY = 'accessToken';

  constructor(private router: Router, private http: HttpClient) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return this.http.post(`${environment.apiUrl}/users/logout`, {}, { withCredentials: true });
  }

  public saveAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  refreshAccessToken() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}/users/refresh-token`, {}, { headers, withCredentials: true }).pipe(tap((res: any) => {
      this.saveAccessToken(res['accessToken']);
    }));
  }

}
