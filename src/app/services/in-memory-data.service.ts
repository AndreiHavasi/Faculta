import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { RentalOrder } from "../rental-order";
import { Car } from "../car";

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
    const cars: Car[] = [
      { name: 'matiz', url: '../assets/images/matiz.jpg', id: 1, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []},
      { name: 'tigaie', url: '../assets/images/bmw.jpg', id: 2, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []},
      { name: 'cls', url: '../assets/images/cls.jpg', id: 3, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []}
    ];
    return {orders, cars};
  }

  constructor() { }
}
