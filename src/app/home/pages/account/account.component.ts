import { Component, OnInit } from '@angular/core';
import { Account } from "../../../core/models/account";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account = { username: '', password: '', loggedIn: true };

  constructor() { }

  ngOnInit(): void {}

}
