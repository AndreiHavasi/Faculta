import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../core/services/account.service";
import { Account } from "../../../core/models/account";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account = { username: '', password: '', loggedIn: true };

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuth();
  }

  private getAuth() {
    const authedAccount = this.authService.authedAccount;
    this.account = { username: authedAccount.username, password: authedAccount.password, loggedIn: true, _id: authedAccount._id };
  }

}
