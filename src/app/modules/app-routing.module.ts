import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../components/pages/home/home.component";
import { AboutComponent } from "../components/pages/about/about.component";
import { ContactComponent } from "../components/pages/contact/contact.component";
import { OrdersComponent } from "../components/pages/orders/orders.component";
import { ChooseComponent } from "../components/pages/choose/choose.component";
import { LoginComponent } from "../components/pages/login/login.component";
import { SignupComponent } from "../components/pages/signup/signup.component";
import { AccountComponent} from "../components/pages/account/account.component";
import { AuthGuardService } from "../services/auth-guard.service";
import { MainComponent } from "../components/layouts/main/main.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', canActivate: [AuthGuardService], component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
