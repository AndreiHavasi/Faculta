import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class TokenService {

  private TOKEN_KEY = 'token';

  constructor(private router: Router) { }

  logout(): Promise<boolean> {
    localStorage.clear();
    return this.router.navigate(['/login']);
  }

  public saveAccessToken(token: string) {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
