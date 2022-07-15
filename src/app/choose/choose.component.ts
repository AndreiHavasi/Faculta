import { Component, OnInit } from '@angular/core';
import { CarService } from "../services/car.service";
import { OrderService } from "../services/order.service";
import { RentalOrder } from "../rental-order";
import { Car } from "../car";
import { Router } from "@angular/router";

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  availableCars: Car[] = [];
  orders: RentalOrder[] = [];

  constructor(
    private carService: CarService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // not good if a lot of orders, 2 requests depending on each other
    this.getOrders();
    this.getCars();
  }

  private getCars(): void {
    this.carService.getCars().subscribe(cars => {
      this.availableCars = cars.filter(car => this.isCarAvailable(car));
    });
  }

  private getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  private isCarAvailable(car: Car): boolean {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
    if(typeof car.pickDate !== undefined)
      //@ts-ignore car.pickDate / car.leaveDate possibly undefined
      if(car.pickDate <= lastOrder.leaveDate && car.leaveDate >= lastOrder.pickDate)
        return false;
    return true;
  }

  rentCar(car: Car) {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
    car.pickDate = lastOrder.pickDate;
    car.leaveDate = lastOrder.leaveDate;
    car.pickTime = lastOrder.pickLocation;
    car.leaveTime = lastOrder.pickTime;

    this.carService.postCar(car).subscribe(() => this.navigateToHome());
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
