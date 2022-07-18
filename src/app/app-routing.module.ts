import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { OrdersComponent } from "./orders/orders.component";
import { ChooseComponent } from "./choose/choose.component";
import { AccountComponent} from "./account/account.component";


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'choose', component: ChooseComponent },
  { path: 'account', component: AccountComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
