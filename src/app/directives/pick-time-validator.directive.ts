import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPickTimeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PickTimeValidatorDirective, multi: true}
  ]
})
export class PickTimeValidatorDirective implements Validator, OnChanges {

  @Input() leaveTime: string = '';
  @Input() pickDate: Date = new Date();
  @Input() leaveDate: Date = new Date();

  private onChange?: () => void;

  constructor() { }

  validate(control: FormControl) {

    let pickTime: string = control.value;

    if(this.leaveTime <= pickTime && this.dateCheck()) {
      return {'pick-time-validator': true, 'requiredValue': [this.leaveTime, this.pickDate, this.leaveDate]}
    }

    return null;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if('leaveTime' in changes && this.onChange) {
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
