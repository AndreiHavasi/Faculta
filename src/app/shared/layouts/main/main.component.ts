import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenService } from "../../../core/services/token.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.router.navigate(['/login']);
    this.tokenService.logout().subscribe();
  }

}
