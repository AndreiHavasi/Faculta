import { FormGroup } from "@angular/forms";

export function passwordConfirmValidator(passwordControlName: string, passwordConfirmControlName: string) {
  return(formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[passwordControlName];
    const passwordConfirmControl = formGroup.controls[passwordConfirmControlName];
    const password = passwordControl.value;
    const passwordConfirm = passwordConfirmControl.value;

    if(password != passwordConfirm)
      passwordConfirmControl.setErrors({notConfirmed: true});
    else
      passwordConfirmControl.setErrors(null);
  }
}