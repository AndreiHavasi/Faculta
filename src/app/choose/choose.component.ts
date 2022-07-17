import {Component, OnInit} from '@angular/core';
import {CarService} from "../services/car.service";
import {OrderService} from "../services/order.service";
import {RentalOrder} from "../rental-order";
import {Car} from "../car";
import {Router} from "@angular/router";
import {combineLatest, Observable} from "rxjs";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  loading$ = this.loadingService.loading$;

  availableCars: Car[] = [];
  orders: RentalOrder[] = [];

  constructor(
    private loadingService: LoadingService,
    private carService: CarService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.getCars(),
      this.getOrders()
    ])
      .subscribe(value => {
        const cars: Car[] = value[0];
        this.orders = value[1];
        this.availableCars = cars.filter(car => this.isCarAvailable(car));
      });
  }

  private getCars(): Observable<Car[]> {
    return this.carService.getCars();
  }

  private getOrders(): Observable<RentalOrder[]> {
    return this.orderService.getOrders();
  }

  private isCarAvailable(car: Car): boolean {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
    if(typeof car.pickDate !== undefined)
      for(let i = 0; i < car.pickDate.length; i ++)
        if(car.pickDate[i] <= lastOrder.leaveDate && car.leaveDate[i] >= lastOrder.pickDate)
          return false;
    return true;
  }

  rentCar(car: Car) {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
    car.pickDate.push(lastOrder.pickDate);
    car.leaveDate.push(lastOrder.leaveDate);
    car.pickTime.push(lastOrder.pickLocation);
    car.leaveTime.push(lastOrder.pickTime);

    this.carService.postCar(car).subscribe(() => this.navigateToHome());
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
