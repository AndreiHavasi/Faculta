import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./modules/material.module";
import { AppRoutingModule } from "../app-routing.module";

import { MainComponent } from "./layouts/main/main.component";
import { AdDirective } from './ad/directives/ad.directive';
import { AdBannerComponent } from './ad/ad-banner/ad-banner.component';
import { CarAdComponent } from "./ad/car-ad.component";



@NgModule({
  declarations: [
    MainComponent,
    AdDirective,
    AdBannerComponent,
    CarAdComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AdBannerComponent,
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
