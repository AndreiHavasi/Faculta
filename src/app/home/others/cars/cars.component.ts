import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarService } from "../../../core/services/car.service";
import { Car } from "../../../core/models/car";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  @ViewChild('slider') slider!: ElementRef;

  componentDestroyed$: Subject<boolean> = new Subject();
  cars: Car[] = [];

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private getCars(): void {
    this.carService.getCars()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(cars => this.cars = cars);
  }

  carImage(carName: string): string {
    switch(carName) {
      case 'Toyota Corolla':
        return '../../../../assets/images/corolla.png'
      case 'Ford F-150':
        return '../../../../assets/images/f150.png'
      case 'Honda Civic':
        return '../../../../assets/images/honda.png'
      case 'Tesla Model 3':
        return '../../../../assets/images/tesla.png'
      case 'Volkswagen Golf GTI':
        return '../../../../assets/images/gti.png'

      default:
        return ''
    }
  }

  /** DRAGGABLE CAROUSEL **/

  grabbed = false;
  initialX: any;
  scrollLeft: any;

  mousedown(e: MouseEvent): void {
    this.grabbed = true;
    this.slider.nativeElement.classList.add('active');
    this.initialX = e.pageX - this.slider.nativeElement.offsetLeft;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
  }

  mouseleave(): void {
    this.grabbed = false;
    this.slider.nativeElement.classList.remove('active');
  }

  mouseup(): void {
    this.grabbed = false;
    this.slider.nativeElement.classList.remove('active');
  }

  mousemove(e: MouseEvent): void {
    if(!this.grabbed) return;
    e.preventDefault();

    const x = e.pageX - this.slider.nativeElement.offsetLeft;
    const dx = (x - this.initialX);
    this.slider.nativeElement.scrollLeft = this.scrollLeft - dx;
  }

}
