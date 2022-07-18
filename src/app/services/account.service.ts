import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../account";
import { first, Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountsUrl = 'api/accounts';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET: get account from mock server */
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => console.log('got accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      )
  }

  /** POST: send account to mock server */
  postAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      tap((newAccount: Account) => console.log(`posted account with id=${newAccount.id}`)),
      catchError(this.handleError<Account>('postAccount'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

  public static isAccountLoggedIn(account: Account) : boolean {
    return account.loggedIn;
  }
}
