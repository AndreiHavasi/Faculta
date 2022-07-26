import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../../core/services/account.service";
import { Account } from "../../../core/classes/account";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account = new Account('','',true);

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuth();
  }

  private getAuth() {
    const authedAccount = this.authService.authedAccount;
    this.account = new Account(authedAccount.username,authedAccount.password, authedAccount.loggedIn, authedAccount.id);
  }

}
