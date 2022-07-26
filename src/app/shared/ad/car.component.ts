import { Component, Input } from '@angular/core';
import { Ad } from "./ad";

@Component({
  template: `
    <div>
      <p>{{data.name}}</p>
      <p>{{data.price}}</p>
    </div>
  `
})
export class CarComponent implements Ad {
  @Input() data: any;
}