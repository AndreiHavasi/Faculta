import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../../core/services/order.service";
import { RentalOrder } from "../../../core/models/rental-order";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  orders: RentalOrder[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private getOrders(): void {
    this.orderService.getOrders()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(orders => this.orders = orders);
  }
}
