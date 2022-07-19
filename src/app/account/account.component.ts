import { Component, OnInit } from '@angular/core';
import { AccountService } from "../services/account.service";
import { Account } from "../account";
import { map } from "rxjs";

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

  private getLoggedInAccount() {
    let authedAccount: Account;
    this.accountService.getAccounts()
      .pipe(
        map(accounts => {
          authedAccount = accounts.filter(account => AccountService.isAccountLoggedIn(account))[0];
        })
      )
      .subscribe(() =>
        this.account = new Account(authedAccount.username, authedAccount.password, authedAccount.loggedIn, authedAccount.id)
      );
  }

}
