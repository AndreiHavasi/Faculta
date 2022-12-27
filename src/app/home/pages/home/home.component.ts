import { Component, OnInit } from '@angular/core';
import { RentalOrder } from "../../../core/models/rental-order";
import { OrderService } from "../../../core/services/order.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AdService } from "../../../shared/ad/services/ad.service";
import { AdItem } from "../../../shared/ad/ad-item";
import { TokenService } from "../../../core/services/token.service";
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ads: AdItem[] = [];

  componentDestroyed$: Subject<boolean> = new Subject();

  locations = ['Iosia', 'Nufaru', 'Rogerius', 'Velenta'];
  times = ['06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00',
    '12:30', '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30', '18:00','18:30','19:00',
    '19:30','20:00','20:30','21:00','21:30'];
  today = new Date(new Date().setHours(new Date().getHours()+3));

  model: RentalOrder = {
    pickLocation: 'Iosia',
    leaveLocation: 'Iosia',
    pickDate: this.today,
    leaveDate:  new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours()+3)),
    pickTime: '08:00',
    leaveTime: '21:00',
    carId: '',
    userId: (jwt_decode(this.tokenService.getAccessToken()!) as any).id
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private adService: AdService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.ads = this.adService.getAds();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  changeLeaveDate(): void {
    if(this.model.leaveDate < this.model.pickDate)
      this.model.leaveDate = new Date(new Date(this.model.pickDate).setDate(new Date(this.model.pickDate).getDate() + 1));
  }

  onSubmit(order: RentalOrder): void {
    this.orderService.postOrder(order)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.router.navigateByUrl('/choose'));
  }
}
