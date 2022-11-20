import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from "rxjs";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  invalidCredentials = false;

  login(username: string, password: string) {
    const body = new HttpParams().set('username', username).set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${environment.apiUrl}/users/login`, body, { headers, responseType: 'json', withCredentials: true }).subscribe({
      next: (response: any) => {
        this.tokenService.saveAccessToken(response['accessToken']);
        this.router.navigate(['/home']);
        this.invalidCredentials = false;
      },
      error: (err) => {
        this.invalidCredentials = true;
        throwError(err);
      },
    });
  }
}

