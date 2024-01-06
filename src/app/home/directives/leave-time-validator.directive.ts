import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLeaveTimeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LeaveTimeValidatorDirective, multi: true}
  ]
})
export class LeaveTimeValidatorDirective implements Validator, OnChanges {

  @Input() pickTime: string = '';
  @Input() pickDate: Date = new Date();
  @Input() leaveDate: Date = new Date();

  private onChange?: () => void;

  constructor() { }

  validate(control: FormControl) {

    const leaveTime: string = control.value;

    if(this.pickTime >= leaveTime && this.dateCheck()) {
      return {'leave-time-validator': true, 'requiredValue': [this.pickTime, this.pickDate.toISOString(), this.leaveDate.toISOString()]}
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(('pickTime' in changes || 'pickDate' in changes || 'leaveDate' in changes) && this.onChange) {
      this.onChange();
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  dateCheck(): boolean {
    return new Date(this.pickDate).toISOString().split('T')[0] ==
      new Date(this.leaveDate).toISOString().split('T')[0];
  }

}
