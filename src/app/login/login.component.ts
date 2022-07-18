import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { Account } from "../account";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z].{2,12}$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])' +
            '(?=.*[A-Z])' +
            '(?=.*[0-9])' +
            '.{9,}'
          )
        ]
      ]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;

    if(this.loginForm.valid) {
      this.login();
      this.navigateToHome();
    }
    else {
      console.log('oof la login');
    }
  }

  login(): void {
    let account: Account = new Account(this.formControl['username'].value, this.formControl['password'].value, true);
    console.log(account);
    this.accountService.postAccount(account);
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
