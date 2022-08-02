import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeModule } from "../../home.module";
import { PickTimeValidatorDirective } from "../../directives/pick-time-validator.directive";
import { LeaveTimeValidatorDirective } from "../../directives/leave-time-validator.directive";
import { By } from "@angular/platform-browser";
import { FormControl, NgForm } from "@angular/forms";

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

    /*
    let pickTime = fixture.debugElement.query(By.css('[name=pickTime]'));
    let leaveTime = fixture.debugElement.query(By.css('[name=leaveTime]'));

    let form: NgForm = fixture.debugElement.query(By.css('card')).injector.get(NgForm);
    let pickTimeControl = form.control.get('pickTime');
    let leaveTimeControl = form.control.get('leaveTime');
     */

    //good input
    expect(pickTimeValidator.validate(new FormControl('08:00'))).toEqual(null);
    expect(leaveTimeValidator.validate(new FormControl('16:00'))).toEqual(null);

    //bad input
    expect(pickTimeValidator.validate(new FormControl('16:00'))).toEqual(null);
    expect(leaveTimeValidator.validate(new FormControl('08:00'))).toEqual({
      'leave-time-validator': true, 'requiredValue': ['08:00', sameDate.toISOString(), sameDate.toISOString()]
    });

  });
});
