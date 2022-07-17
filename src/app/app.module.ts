import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { OrdersComponent } from "./orders/orders.component";

import { InMemoryDataService } from './services/in-memory-data.service';
import { LeaveTimeValidatorDirective } from './directives/leave-time-validator.directive';
import { PickTimeValidatorDirective } from './directives/pick-time-validator.directive';
import { CarsComponent } from './cars/cars.component';
import { ChooseComponent } from './choose/choose.component';
import { NetworkInterceptor } from "./services/network.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    OrdersComponent,
    LeaveTimeValidatorDirective,
    PickTimeValidatorDirective,
    CarsComponent,
    ChooseComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    // mock server api
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    )

  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ro'},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
