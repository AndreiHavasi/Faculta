import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/modules/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/pages/home/home.component';
import { AboutComponent } from './home/pages/about/about.component';
import { ContactComponent } from './home/pages/contact/contact.component';
import { OrdersComponent } from "./home/pages/orders/orders.component";
import { CarsComponent } from './home/others/cars/cars.component';
import { ChooseComponent } from './home/pages/choose/choose.component';
import { AccountComponent } from './home/pages/account/account.component';
import { SignupComponent } from './core/auth/pages/signup/signup.component';
import { LoginComponent } from './core/auth/pages/login/login.component';

import { InMemoryDataService } from './core/services/in-memory-data.service';
import { LeaveTimeValidatorDirective } from './home/directives/leave-time-validator.directive';
import { PickTimeValidatorDirective } from './home/directives/pick-time-validator.directive';
import { NetworkInterceptor } from "./core/services/network.interceptor";
import { LoginModalComponent } from './core/auth/modals/login-modal/login-modal.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { SignupModalComponent } from './core/auth/modals/signup-modal/signup-modal.component';


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
    ChooseComponent,
    SignupComponent,
    LoginComponent,
    AccountComponent,
    LoginModalComponent,
    MainComponent,
    SignupModalComponent
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
    ),
    ReactiveFormsModule

  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ro'},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
