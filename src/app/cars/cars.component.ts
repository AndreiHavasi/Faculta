import { Component, OnInit } from '@angular/core';
import { CarService } from "../services/car.service";
import { Car } from "../car";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  private getCars(): void {
    this.carService.getCars().subscribe(cars => this.cars = cars);
  }

}
