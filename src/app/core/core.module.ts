import { NgModule, LOCALE_ID } from '@angular/core';

import { SharedModule } from "../shared/shared.module";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/in-memory-data.service";

import { LoginModalComponent } from "./auth/modals/login-modal/login-modal.component";
import { SignupModalComponent } from "./auth/modals/signup-modal/signup-modal.component";

import { LoginComponent } from "./auth/pages/login/login.component";
import { SignupComponent } from "./auth/pages/signup/signup.component";
import { NetworkInterceptor } from "./services/network.interceptor";

@NgModule({
  declarations: [
    LoginModalComponent,
    SignupModalComponent,
    LoginComponent,
    SignupComponent
  ]
  ,
  imports: [
    SharedModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    )
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ro'},
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true}
  ],
})
export class CoreModule {

  constructor() { }
}
