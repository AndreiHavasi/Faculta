import { Injectable } from '@angular/core';
import { AccountService } from "./account.service";
import { Account } from "../account";
import { map, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accounts: Account[] = [];

  constructor(
    private accountService: AccountService
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

}
