import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HomeComponent } from "./home.component";
import { HomeModule } from "../../home.module";
import { FormControl, NgForm } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { PickTimeValidatorDirective } from "../../directives/pick-time-validator.directive";
import { LeaveTimeValidatorDirective } from "../../directives/leave-time-validator.directive";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let form: NgForm;
  let pickTimeValidator: PickTimeValidatorDirective;
  let leaveTimeValidator: LeaveTimeValidatorDirective;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ HomeModule ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(async() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    const pickTimeValidatorEl = fixture.debugElement.query(By.directive(PickTimeValidatorDirective));
    const leaveTimeValidatorEl = fixture.debugElement.query(By.directive(LeaveTimeValidatorDirective));
    pickTimeValidator = pickTimeValidatorEl.injector.get(PickTimeValidatorDirective);
    leaveTimeValidator = leaveTimeValidatorEl.injector.get(LeaveTimeValidatorDirective);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('pick and leave time initial values should be valid', () => {
    const pickTimeControl = form.form.controls['pickTime'];
    const leaveTimeControl = form.form.controls['leaveTime'];

    expect(pickTimeValidator.validate(pickTimeControl as FormControl)).toEqual(null);
    expect(leaveTimeValidator.validate(leaveTimeControl as FormControl)).toEqual(null);
  });

  it('pick and leave time wrong values should not be valid', fakeAsync(() => {
    const sameDate = new Date();

    const pickTimeEl = fixture.debugElement.query(By.css('[name=pickTime]'));
    const leaveTimeEl = fixture.debugElement.query(By.css('[name=leaveTime]'));
    const pickTime: HTMLSelectElement = pickTimeEl.nativeElement;
    const leaveTime: HTMLSelectElement = leaveTimeEl.nativeElement;

    const pickTimeControl = form.control.get('pickTime');
    const leaveTimeControl = form.control.get('leaveTime');

    pickTime.value = '16:00';
    leaveTime.value = '08:00';
    pickTime.dispatchEvent(new Event('change'));
    leaveTime.dispatchEvent(new Event('change'));

    pickTimeValidator.pickDate = sameDate;
    pickTimeValidator.leaveDate = sameDate;
    leaveTimeValidator.pickDate = sameDate;
    leaveTimeValidator.leaveDate = sameDate;

    fixture.detectChanges();
    tick();

    expect(pickTimeValidator.validate(pickTimeControl as FormControl)).not.toEqual(null);
    expect(leaveTimeValidator.validate(leaveTimeControl as FormControl)).not.toEqual(null);
  }));

});
