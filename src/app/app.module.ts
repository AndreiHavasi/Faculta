import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { HomeModule } from "./home/home.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    HomeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
