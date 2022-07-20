import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return(control: AbstractControl): ValidationErrors | null => {

    const password = control.value;

    const upperCaseTest = /[A-Z]+/.test(password);
    const lowerCaseTest = /[a-z]+/.test(password);
    const digitTest = /\d+/.test(password);
    const symbolTest = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+/.test(password);
    const lengthTest = /.{12,}/.test(password);
    const spaceTest = !(/\s+/.test(password));

    const passwordIsValid = upperCaseTest && lowerCaseTest && digitTest&&  symbolTest && lengthTest && spaceTest ;

    const passwordStrength: {
      hasUpperCase: boolean,
      hasLowerCase: boolean,
      hasDigit: boolean,
      hasSymbol: boolean,
      lengthGood: boolean,
      noSpace: boolean
    } = {
      hasUpperCase: upperCaseTest,
      hasLowerCase: lowerCaseTest,
      hasDigit: digitTest,
      hasSymbol: symbolTest,
      lengthGood: lengthTest,
      noSpace: spaceTest
    }

    return passwordIsValid ? null : passwordStrength;
  }
}
