import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Account } from "../models/account";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountsUrl = environment.apiUrl + '/accounts';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl)
      .pipe(
        tap(_ => console.log('got accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      )
  }

  postAccount(account: Account): Observable<Account> {
    console.log(account);
    return this.http.post<Account>(this.accountsUrl, account, this.httpOptions).pipe(
      tap((newAccount: Account) => console.log(`posted account with id=${newAccount._id}`)),
      catchError(this.handleError<Account>('postAccount'))
    );
  }

  putAccount(account: Account): Observable<any> {
    const accountUrl = this.accountsUrl;
    return this.http.put(accountUrl, account, this.httpOptions).pipe(
      tap(_ => console.log(`updated account with id=${account._id}`)),
      catchError(this.handleError<any>('putAccount'))
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
