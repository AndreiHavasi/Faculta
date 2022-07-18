import { Component, OnInit } from '@angular/core';
import { AccountService } from "../services/account.service";
import { Account } from "../account";
import { first, Subject } from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account = new Account('','',true);

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getLoggedInAccount();
  }

  private getLoggedInAccount(): void {
    let loggedInAccount: Account;
    this.accountService.getAccounts()
      .pipe(first())
      .subscribe(accounts => {
          loggedInAccount = (accounts.filter(account => AccountComponent.isAccountLoggedIn(account)))[0];
        },
        error => {},
        () => this.account = new Account(loggedInAccount.username, loggedInAccount.password,
          loggedInAccount.loggedIn, loggedInAccount.id)
      );
  }

  private static isAccountLoggedIn(account: Account) : boolean {
    return account.loggedIn;
  }

}
