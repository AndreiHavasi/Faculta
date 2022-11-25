import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { Account } from "../models/account";


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  login(username: string, password: string) {
    const body = new HttpParams().set('username', username).set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${environment.apiUrl}/users/login`, body, { headers, responseType: 'json', withCredentials: true }).subscribe({
      next: (response: any) => {
        this.tokenService.saveAccessToken(response['accessToken']);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        throwError(err);
      },
    });
  }

  register(account: Account) {
    const body = new HttpParams().set('username', account.username).set('password', account.password).set('role', account.role);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(`${environment.apiUrl}/users/register`, body, { headers, responseType: 'json', withCredentials: true });
  }
}

