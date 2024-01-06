import { Injectable } from '@angular/core';
import { AdItem } from "../ad-item";
import { CarAdComponent } from "../car-ad.component";

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() { }

  getAds() {
    return [
      new AdItem(
        CarAdComponent,
        {name: 'Matiz', url: '../assets/images/matiz.jpg', price:'400 €'}
      ),
      new AdItem(
        CarAdComponent,
        {name: 'BMW E46', url: '../assets/images/bmw.jpg', price:'2000 €'}
      ),
      new AdItem(
        CarAdComponent,
        {name: 'CLS', url: '../assets/images/cls.jpg', price:'40000 €'}
      )
    ];
  }
}
