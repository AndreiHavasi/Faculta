import { Injectable } from '@angular/core';
import { AccountService } from "./account.service";
import { Account } from "../account";
import { first } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: Account = new Account('','',false);

  constructor(
    private accountService: AccountService
  ) { }

  public isAuthenticated(): boolean {
    this.getLoggedInAccount();
    return this.account.loggedIn;
  }

  private getLoggedInAccount(): void {
    let loggedInAccount: Account;
    this.accountService.getAccounts()
      .pipe(first())
      .subscribe(accounts => {
          loggedInAccount = (accounts.filter(account => AccountService.isAccountLoggedIn(account)))[0];
        },
        error => {},
        () => this.account = new Account(loggedInAccount.username, loggedInAccount.password,
          loggedInAccount.loggedIn, loggedInAccount.id)
      );
  }
}
