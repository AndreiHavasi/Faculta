import { Component, OnInit } from '@angular/core';
import { CarService } from "../../../core/services/car.service";
import { Car } from "../../../core/classes/car";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();
  cars: Car[] = [];

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private getCars(): void {
    this.carService.getCars()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(cars => this.cars = cars);
  }

}
