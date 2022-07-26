import { Injectable } from '@angular/core';
import { AdItem } from "../ad-item";
import { CarComponent } from "../car.component";

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() { }

  getAds() {
    return [
      new AdItem(
        CarComponent,
        {name: 'Matiz', url: '../assets/images/matiz.jpg', price:'400 €'}
      ),
      new AdItem(
        CarComponent,
        {name: 'Tigaie', url: '../assets/images/bmw.jpg', price:'2000 €'}
      ),
      new AdItem(
        CarComponent,
        {name: 'CLS', url: '../assets/images/cls.jpg', price:'40000 €'}
      )
    ];
  }
}
