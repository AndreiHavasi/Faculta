import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if(!this.authService.isAuthenticated()){
      alert('vezi ca nu esti logat')
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
