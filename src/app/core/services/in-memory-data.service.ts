import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { RentalOrder } from "../classes/rental-order";
import { Car } from "../classes/car";
import { Account } from "../classes/account";

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
      { name: 'Volkswagen Polo', url: '../assets/images/polo.jpg', seats: 5, engine: 'Benzina', transmission: 'Manual', rate: 50, id: 1, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []},
      { name: 'Skoda Octavia', url: '../assets/images/skoda.jpg', seats: 5, engine: 'Diesel', transmission: 'Manual', rate: 100, id: 2, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []},
      { name: 'Mercedes GLE', url: '../assets/images/gle.jpg', seats: 5, engine: 'Diesel', transmission: 'Automatic', rate: 250,  id: 3, pickDate: [], leaveDate: [], pickTime: [], leaveTime: []}
    ];

    const accounts: Account[] = [
      { username: 'admin', password: 'Rentitadmin.2022', loggedIn: false, id: 0}
    ];

    return {orders, cars, accounts};
  }

  constructor() { }
}
