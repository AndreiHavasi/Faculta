import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarService } from "../../../core/services/car.service";
import { Car } from "../../../core/classes/car";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;

  componentDestroyed$: Subject<boolean> = new Subject();
  cars: Car[] = [];

  pressed: boolean = true;
  startX: number = 0;
  x: number = 0;

  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  ngAfterViewInit(): void {
    console.log(this.sliderContainer);
    console.log(this.slider);
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

  sliderEntered(event: MouseEvent): void {
    this.sliderContainer.nativeElement.style.cursor = "grab";
  }

  sliderPressed(event: MouseEvent): void {
    this.pressed = true;
    this.startX = event.offsetX - this.slider.nativeElement.offsetLeft;
    this.sliderContainer.nativeElement.style.cursor = "grabbing";
  }

  sliderUnPressed(event: MouseEvent): void {
    this.sliderContainer.nativeElement.style.cursor = "grab";
    this.pressed = false;
  }

  sliderGrabbed(event: MouseEvent): void {
    if (!this.pressed) return;
    event.preventDefault();

    this.x = event.offsetX;
    console.log('start X: ' + this.startX);
    console.log('X: ' + this.x);
    this.slider.nativeElement.style.left = `${this.x - this.startX}px`;

    this.checkBoundary();
  }


  checkBoundary = () => {
    let outer =  this.sliderContainer.nativeElement.getBoundingClientRect();
    let inner =  this.slider.nativeElement.getBoundingClientRect();

    if (parseInt(this.slider.nativeElement.style.left) > 0) {
      this.slider.nativeElement.style.left = "0px";
    }

    if (inner.right < outer.right) {
      this.slider.nativeElement.style.left = `-${inner.width - outer.width}px`;
    }
  };


}
