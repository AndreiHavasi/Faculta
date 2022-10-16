import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../../../services/account.service";
import { Account } from "../../../models/account";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from "../../modals/login-modal/login-modal.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  accounts: Account[] = [];

  public loginForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAccounts();

    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }


  onSubmit(): void {
    this.submitted = true;
    let account: Account = {
      username: this.username.value,
      password: this.password.value,
      loggedIn: true
    }

    if(this.loginForm.valid) {
      this.login(account);
    }
    else {
      console.log('oof la login');
    }
  }

  private login(account: Account): void {
    const signedUpAccount = this.accountIsSignedUp(account);
    if (signedUpAccount != undefined) {
      if (LoginComponent.passwordIsValid(account, signedUpAccount)) {
        signedUpAccount.loggedIn = true;
        this.accountService.putAccount(signedUpAccount)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(() => this.authService.login());
      }
      else this.loginModal();
    }
    else this.loginModal();

  }

  private accountIsSignedUp(loggingAccount: Account): Account | undefined {
    return this.accounts.find(account => account.username == loggingAccount.username);
  }

  private static passwordIsValid(loggingAccount: Account, signedUpAccount: Account): boolean {
    return loggingAccount.password == signedUpAccount.password;
  }

  private getAccounts(): void {
    this.accountService.getAccounts()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(accounts => this.accounts = accounts);
  }

  private loginModal(): void {
    this.matDialog.open(LoginModalComponent,{panelClass: 'custom-dialog-container'});
  }

}
