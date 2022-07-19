import { Injectable } from '@angular/core';
import { AccountService } from "./account.service";
import { Account } from "../account";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authedAccount: Account = new Account('', '', true);

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  public isAuth(): Observable<boolean> {
    let authedAccount: Account;
    return this.accountService.getAccounts().pipe(
      map(accounts => {
        authedAccount = accounts.filter(account => AccountService.isAccountLoggedIn(account))[0];
        return authedAccount !== undefined;
      })
    );
  }

  public login() {
    let authedAccount: Account;
    this.accountService.getAccounts().pipe(
      map(accounts => {
        authedAccount = accounts.filter(account => AccountService.isAccountLoggedIn(account))[0];
      })
    ).subscribe(() =>
      this.authedAccount = new Account(authedAccount.username, authedAccount.password, authedAccount.loggedIn, authedAccount.id)
    );
  }

  public logout() {
    this.authedAccount.loggedIn = false;
    this.accountService.putAccount(this.authedAccount).subscribe(() => this.router.navigateByUrl(''));
  }

}
