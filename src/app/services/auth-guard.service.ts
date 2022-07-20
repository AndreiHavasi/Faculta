import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(isAuth => {
        if(!isAuth)
          this.router.navigateByUrl('');
      })
    );
  }
}
