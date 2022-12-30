import { Component, Input } from '@angular/core';
import { Ad } from "./ad";

@Component({
  template: `
    <div>
      <img class="w-100" [alt]="data.name" [src]="data.url">
      <div class="car-details md-text text-uppercase text-center pt-3 pb-3 mb-5">
        {{data.name}}
        {{data.price}}
      </div>
    </div>
  `,
  styles: ['.car-details { background-color: #0d6efd; }']
})
export class CarAdComponent implements Ad {
  @Input() data: any;
}
