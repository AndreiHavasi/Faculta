import { Validator, NG_VALIDATORS, FormControl, Form } from "@angular/forms";
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appPickTimeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PickTimeValidatorDirective, multi: true}
  ]
})
export class PickTimeValidatorDirective implements Validator {

  @Input() leaveTime: string = '';
  @Input() pickDate: Date = new Date();
  @Input() leaveDate: Date = new Date();

  constructor() { }

  validate(control: FormControl) {

    let pickTime: string = control.value;

    if(this.leaveTime <= pickTime && this.dateCheck()) {
      return {'pick-time-validator': true, 'requiredValue': [this.leaveTime, this.pickDate, this.leaveDate]}
    }

    return null;

  }

  dateCheck(): boolean {
    return new Date(this.pickDate).toISOString().split('T')[0] ==
      new Date(this.leaveDate).toISOString().split('T')[0];
  }

}
