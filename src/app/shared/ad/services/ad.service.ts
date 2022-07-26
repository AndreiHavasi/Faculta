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
        {name: 'Matiz', price:'400 €'}
      ),
      new AdItem(
        CarComponent,
        {name: 'Tigaie', price:'2000 €'}
      ),
      new AdItem(
        CarComponent,
        {name: 'CLS', price:'40000 €'}
      )
    ];
  }
}
