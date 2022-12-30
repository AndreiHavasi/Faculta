import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { TokenService } from "../../../core/services/token.service";
import { OrderService } from "../../../core/services/order.service";
import { RentalOrder } from "../../../core/models/rental-order";
import { take } from "rxjs";
import * as moment from "moment";
import { Car } from "../../../core/models/car";
import { CarService } from "../../../core/services/car.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  username!: string;
  userId!: string;
  decodedToken: any;
  pastOrders: RentalOrder[] = [];
  presentOrders: RentalOrder[] = [];
  cars: Car[] = [];
  moment = moment;

  constructor(private tokenService: TokenService, private orderService: OrderService, private carService: CarService) { }

  ngOnInit() {
    this.decodedToken = jwt_decode(this.tokenService.getAccessToken()!);
    this.username = this.decodedToken.username;
    this.userId = this.decodedToken.id;
    this.getOrders();
    this.getCars();
  }

  cancelOrder(order: RentalOrder) {
    this.orderService.deleteOrder(order)
      .pipe(take(1))
      .subscribe(() => this.getOrders());
  }

  getCarName(carId: string): string {
    const car = this.cars.find((car) => car._id === carId);
    return car!.name;
  }

  private getOrders() {
    const today = new Date(new Date().setHours(new Date().getHours()+3));

    this.orderService.getOrders()
      .pipe(take(1))
      .subscribe((orders) => {
        orders = orders.filter((order) => order.userId === this.userId);
        this.pastOrders = orders.filter((order) => moment(order.leaveDate).isBefore(today, 'day'));
        this.presentOrders = orders.filter((order) => moment(order.pickDate).isSameOrAfter(today, 'day'));
      })
  }

  private getCars() {
    this.carService.getCars()
      .pipe(take(1))
      .subscribe((cars) => {
        this.cars = cars;
      });
  }

}
