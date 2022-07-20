import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../services/account.service";
import { Account } from "../account";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  public loginForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username : [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-z]*$/),
          Validators.minLength(3),
          Validators.maxLength(12)
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
            '(?=.*[-!$%^&*()_+|~=`{}\\[\\]:";\'<>?,.\\/])' +
            '.{12,}'
          )
        ]
      ]
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }


  onSubmit(): void {
    this.submitted = true;
    let account: Account = new Account(this.username.value, this.password.value, true);

    if(this.loginForm.valid) {
      this.login(account);
    }
    else {
      console.log('oof la login');
    }
  }

  private login(account: Account): void {
    this.accountService.postAccount(account)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.authService.login();
        this.navigateToHome()
      });
  }

  private navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
