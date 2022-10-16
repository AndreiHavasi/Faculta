import { Injectable } from '@angular/core';
import { AccountService } from "./account.service";
import { Account } from "../models/account";
import { Router } from "@angular/router";
import { map } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authedAccount: Account = { username: '', password: '', loggedIn: false };

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  public isAuth(): boolean {
    return this.authedAccount.loggedIn;
  }

  public login() {
    let authedAccount: Account;
    this.accountService.getAccounts().pipe(
      map(accounts => {
        authedAccount = accounts.filter(account => AccountService.isAccountLoggedIn(account))[0];
      })
    ).subscribe(() => {
        this.authedAccount = { username: authedAccount.username, password: authedAccount.password, loggedIn: true, _id: authedAccount._id };
        this.router.navigateByUrl('/home');
      }
    );
  }

  public logout() {
    this.authedAccount.loggedIn = false;
    this.accountService.putAccount(this.authedAccount).subscribe(() => this.router.navigateByUrl('/login'));
  }

}
