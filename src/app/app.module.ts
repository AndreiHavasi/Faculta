import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { OrdersComponent } from "./components/pages/orders/orders.component";
import { CarsComponent } from './components/others/cars/cars.component';
import { ChooseComponent } from './components/pages/choose/choose.component';
import { AccountComponent } from './components/pages/account/account.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';

import { InMemoryDataService } from './services/in-memory-data.service';
import { LeaveTimeValidatorDirective } from './directives/leave-time-validator.directive';
import { PickTimeValidatorDirective } from './directives/pick-time-validator.directive';
import { NetworkInterceptor } from "./services/network.interceptor";
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { MainComponent } from './components/layouts/main/main.component';
import { SignupModalComponent } from './components/modals/signup-modal/signup-modal.component';


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
