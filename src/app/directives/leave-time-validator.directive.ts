import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appLeaveTimeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LeaveTimeValidatorDirective, multi: true}
  ]
})
export class LeaveTimeValidatorDirective implements Validator {

  @Input() pickTime: string = '';
  @Input() pickDate: Date = new Date();
  @Input() leaveDate: Date = new Date();

  constructor() { }

  validate(control: FormControl) {

    let leaveTime: string = control.value;

    if(this.pickTime >= leaveTime && this.dateCheck()) {
      return {'leave-time-validator': true, 'requiredValue': [this.pickTime, this.pickDate, this.leaveDate]}
    }

    return null;

  }

  dateCheck(): boolean {
    return new Date(this.pickDate).toISOString().split('T')[0] ==
      new Date(this.leaveDate).toISOString().split('T')[0];
  }

}
