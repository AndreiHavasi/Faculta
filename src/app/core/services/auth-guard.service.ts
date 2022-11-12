import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuth())
      return true;
    else {
      return this.router.navigateByUrl('/login');
    }
  }
}
