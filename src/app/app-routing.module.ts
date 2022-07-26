import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/pages/home/home.component";
import { AboutComponent } from "./home/pages/about/about.component";
import { ContactComponent } from "./home/pages/contact/contact.component";
import { OrdersComponent } from "./home/pages/orders/orders.component";
import { ChooseComponent } from "./home/pages/choose/choose.component";
import { LoginComponent } from "./core/auth/pages/login/login.component";
import { SignupComponent } from "./core/auth/pages/signup/signup.component";
import { AccountComponent} from "./home/pages/account/account.component";
import { AuthGuardService } from "./core/services/auth-guard.service";
import { MainComponent } from "./shared/layouts/main/main.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: '', canActivate: [AuthGuardService], component: MainComponent,
    children: [
      //{ path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'choose', component: ChooseComponent },
      { path: 'account', component: AccountComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
