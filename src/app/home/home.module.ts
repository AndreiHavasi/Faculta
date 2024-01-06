import { NgModule } from '@angular/core';

import { AboutComponent } from "./pages/about/about.component";
import { AccountComponent } from "./pages/account/account.component";
import { CarsComponent } from "./others/cars/cars.component";
import { ChooseComponent } from "./pages/choose/choose.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { HomeComponent } from "./pages/home/home.component";
import { OrdersComponent } from "./pages/orders/orders.component";

import { LeaveTimeValidatorDirective } from "./directives/leave-time-validator.directive";
import { PickTimeValidatorDirective } from "./directives/pick-time-validator.directive";

import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    AboutComponent,
    AccountComponent,
    CarsComponent,
    ChooseComponent,
    ContactComponent,
    HomeComponent,
    OrdersComponent,
    LeaveTimeValidatorDirective,
    PickTimeValidatorDirective
  ],
  imports: [
    SharedModule
  ]
})
export class HomeModule { }
