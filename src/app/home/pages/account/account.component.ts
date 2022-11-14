import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenService } from "../../../core/services/token.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username!: string;
  decodedToken: any;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.decodedToken = jwt_decode(this.tokenService.getAccessToken()!);
    this.username = this.decodedToken.username;
  }

}
