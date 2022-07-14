import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { RentalOrder } from "../rental-order";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const orders: RentalOrder[] = [
      { pickLocation: 'Iosia', leaveLocation: 'Iosia', pickDate: new Date(new Date().setHours(new Date().getHours()+3)),
        leaveDate: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours()+3)),
        pickTime: '08:00', leaveTime: '21:00', id: 0, description: 'mock order for id initialization'}
    ];
    return {orders};
  }

  constructor() { }
}
