import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Car } from "../classes/car";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'api/cars';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient
  ) { }

  /** GET: get cars from mock server */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        tap(_ => console.log('got cars')),
        catchError(this.handleError<Car[]>('getCars', []))
      )
  }

  /** PUT: update car on mock server */
  putCar(car: Car): Observable<any> {
    const carUrl = this.carsUrl + '/' + car.id;
    return this.http.put(carUrl, car, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated car id=${car.id}`)),
        catchError(this.handleError<any>('putCar'))
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }

}
