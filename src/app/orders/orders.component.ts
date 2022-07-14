import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services/order.service";
import { RentalOrder } from "../rental-order";

@Component({
  selector: 'app-about',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: RentalOrder[] = [];


  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }
}
