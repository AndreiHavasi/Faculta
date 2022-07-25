import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RentalOrder } from "../classes/rental-order";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private ordersUrl = 'api/orders';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET: get orders from mock server */
  getOrders(): Observable<RentalOrder[]> {
    return this.http.get<RentalOrder[]>(this.ordersUrl)
      .pipe(
        tap(_ => console.log('got orders')),
        catchError(this.handleError<RentalOrder[]>('getOrders', []))
      )
  }

  /** POST: send order to mock server */
  postOrder(order: RentalOrder): Observable<RentalOrder> {
    return this.http.post<RentalOrder>(this.ordersUrl, order, this.httpOptions).pipe(
      tap((newOrder: RentalOrder) => console.log(`posted order with pick time=${newOrder.pickTime}`)),
      catchError(this.handleError<RentalOrder>('postOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

}
