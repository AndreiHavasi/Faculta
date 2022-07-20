import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { OrdersComponent } from "./orders/orders.component";
import { ChooseComponent } from "./choose/choose.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AccountComponent} from "./account/account.component";
import { AuthGuardService } from "./services/auth-guard.service";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
  { path: 'choose', component: ChooseComponent, canActivate: [AuthGuardService] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
