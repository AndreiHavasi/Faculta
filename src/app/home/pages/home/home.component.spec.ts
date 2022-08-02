import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from "../../home.module";
import { PickTimeValidatorDirective } from "../../directives/pick-time-validator.directive";
import { LeaveTimeValidatorDirective } from "../../directives/leave-time-validator.directive";
import { By } from "@angular/platform-browser";
import { FormControl, NgForm } from "@angular/forms";
import { RentalOrder } from "../../../core/classes/rental-order";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pickTimeValidator: PickTimeValidatorDirective;
  let leaveTimeValidator: LeaveTimeValidatorDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HomeModule ],
      declarations: [ HomeComponent, PickTimeValidatorDirective, LeaveTimeValidatorDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    const pickTimeValidatorEl = fixture.debugElement.query(By.directive(PickTimeValidatorDirective));
    const leaveTimeValidatorEl = fixture.debugElement.query(By.directive(LeaveTimeValidatorDirective));
    pickTimeValidator = pickTimeValidatorEl.injector.get(PickTimeValidatorDirective);
    leaveTimeValidator = leaveTimeValidatorEl.injector.get(LeaveTimeValidatorDirective);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pick and leave time should be valid - ez' ,() => {
    const sameDate = new Date();
    pickTimeValidator.pickDate = sameDate;
    pickTimeValidator.leaveDate = sameDate;
    leaveTimeValidator.pickDate = sameDate;
    leaveTimeValidator.leaveDate = sameDate;

    //good input
    expect(pickTimeValidator.validate(new FormControl('08:00'))).toEqual(null);
    expect(leaveTimeValidator.validate(new FormControl('16:00'))).toEqual(null);

    //bad input
    expect(pickTimeValidator.validate(new FormControl('16:00'))).toEqual(null);
    expect(leaveTimeValidator.validate(new FormControl('08:00'))).toEqual({
      'leave-time-validator': true, 'requiredValue': ['08:00', sameDate.toISOString(), sameDate.toISOString()]
    });
  });

  it('pick and leave time should be valid - proper', fakeAsync(() => {
    const pickTime = fixture.debugElement.query(By.css('[name=pickTime]'));
    const leaveTime = fixture.debugElement.query(By.css('[name=leaveTime]'));
    const pickTimeSelect: HTMLSelectElement = pickTime.nativeElement;
    const leaveTimeSelect: HTMLSelectElement = leaveTime.nativeElement;

    const form = fixture.debugElement.query(By.directive(NgForm));
    const pickTimeControl = form.injector.get(NgForm).control.get('pickTime');
    console.log(pickTimeControl);

    pickTimeSelect.value = '08:00';
    pickTimeSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick();

    console.log(pickTimeControl);
    console.log(pickTimeSelect.value);
  }));
});

/*
  const pickTime = fixture.debugElement.query(By.css('[name=pickTime]'));
    const leaveTime = fixture.debugElement.query(By.css('[name=leaveTime]'));
    const pickTimeSelect: HTMLSelectElement = pickTime.nativeElement;
    const leaveTimeSelect: HTMLSelectElement = leaveTime.nativeElement;
    let form: NgForm = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

    setTimeout(() => {
      let pickTimeControl = form.control.get('pickTime');
      let leaveTimeControl = form.control.get('leaveTime');
      console.log(form);
      console.log(pickTimeControl);
      console.log(leaveTimeControl);

      pickTimeSelect.value = '08:00';
      leaveTimeSelect.value = '16:00';
      pickTimeSelect.dispatchEvent(new Event('change'));
      leaveTimeSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(pickTimeValidator.validate(pickTimeControl as FormControl)).toEqual(null);
      expect(leaveTimeValidator.validate(leaveTimeControl as FormControl)).toEqual(null);
    })
    tick();
*/

/*
    const pickTime = fixture.debugElement.query(By.css('[name=pickTime]'));
    const leaveTime = fixture.debugElement.query(By.css('[name=leaveTime]'));
    const pickTimeSelect: HTMLSelectElement = pickTime.nativeElement;
    const leaveTimeSelect: HTMLSelectElement = leaveTime.nativeElement;
    const submitButton = fixture.debugElement.nativeElement.querySelector('.btn-primary');

    pickTimeSelect.value = '08:00';
    leaveTimeSelect.value = '16:00';
    pickTimeSelect.dispatchEvent(new Event('change'));
    leaveTimeSelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    tick();
    expect(submitButton.disabled).toBeFalsy();

    pickTimeSelect.value = '16:00';
    leaveTimeSelect.value = '08:00';
    pickTimeSelect.dispatchEvent(new Event('change'));
    leaveTimeSelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    tick();
    expect(submitButton.disabled).not.toBeFalsy();
*/

/*
    const pickTime = fixture.debugElement.query(By.css('[name=pickTime]'));
    const leaveTime = fixture.debugElement.query(By.css('[name=leaveTime]'));
    const pickTimeSelect: HTMLSelectElement = pickTime.nativeElement;
    const leaveTimeSelect: HTMLSelectElement = leaveTime.nativeElement;
    let form: NgForm = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);

    pickTimeSelect.value = '08:00';
    leaveTimeSelect.value = '16:00';
    pickTimeSelect.dispatchEvent(new Event('change'));
    leaveTimeSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(form.valid).toBeTruthy();
    })

    pickTimeSelect.value = '16:00';
    leaveTimeSelect.value = '08:00';
    pickTimeSelect.dispatchEvent(new Event('change'));
    leaveTimeSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(form.valid).toBeFalsy();
    })
 */
