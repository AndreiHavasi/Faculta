import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rent-it';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public showPageLinks(): boolean {
    return this.router.url != '/';
  }

  public logout() {
    this.authService.logout();
  }
}
