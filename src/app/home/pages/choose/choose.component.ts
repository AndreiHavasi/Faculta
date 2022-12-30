import { Component, OnInit } from '@angular/core';
import { CarService } from "../../../core/services/car.service";
import { OrderService } from "../../../core/services/order.service";
import { RentalOrder } from "../../../core/models/rental-order";
import { Car } from "../../../core/models/car";
import { Router } from "@angular/router";
import { combineLatest, Subject, takeUntil, take } from "rxjs";
import { LoadingService } from "../../../core/services/loading.service";

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  loading$ = this.loadingService.loading$;
  componentDestroyed$: Subject<boolean> = new Subject();

  availableCars: Car[] = [];
  orders: RentalOrder[] = [];
  orderConfirmed = false;

  constructor(
    private loadingService: LoadingService,
    private carService: CarService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.carService.getCars(),
      this.orderService.getOrders()
    ])
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => {
        const cars: Car[] = value[0];
        this.orders = value[1];
        this.availableCars = cars.filter(car => this.isCarAvailable(car));
      });

  }

  ngOnDestroy(): void {
    this.orderUnconfirmed();
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private isCarAvailable(car: Car): boolean {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
    const carId = car._id;

    for(let i = 0; i < this.orders.length; i++)
      if(this.orders[i].carId == carId && this.orders[i].pickDate <= lastOrder.leaveDate && this.orders[i].leaveDate >= lastOrder.pickDate)
        return false;
    return true;
  }

  rentCar(car: Car) {
    const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];

    lastOrder.carId = car._id;
    this.orderService.patchOrder(lastOrder)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.orderConfirmed = true;
        this.router.navigateByUrl('/home');
      });
  }

  orderUnconfirmed() {
    if(!this.orderConfirmed) {
      const lastOrder: RentalOrder = (this.orders)[this.orders.length - 1];
      this.orderService.deleteOrder(lastOrder)
        .pipe(take(1))
        .subscribe();
    }
  }

  carImage(carName: string): string {
    switch(carName) {
      case 'Volkswagen Polo':
        return '../../../../assets/images/polo.jpg'
      case 'Skoda Octavia':
        return '../../../../assets/images/skoda.jpg'
      case 'Mercedes GLE':
        return '../../../../assets/images/gle.jpg'
      default:
        return ''
    }
  }

}
