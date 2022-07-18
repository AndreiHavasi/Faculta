import { Component, OnInit } from '@angular/core';
import { AccountService } from "../services/account.service";
import { Account } from "../account";
import { combineLatest, first, Observable, Subject } from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getLoggedInAccount();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private getLoggedInAccount() {
    let loggedInAccount: Account;
    this.accountService.getAccounts()
      .pipe()
      .subscribe(accounts => {
          console.log(accounts);
          this.accounts = accounts.filter(account => this.isAccountLoggedIn(account))
        }
      );
  }

  private isAccountLoggedIn(account: Account) : boolean {
    return account.loggedIn;
  }

}
