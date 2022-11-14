import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountService } from "../../../services/account.service";
import { Account } from "../../../models/account";
import { Subject, takeUntil } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { passwordValidator } from "../../validators/password.validator";
import { passwordConfirmValidator } from "../../validators/password-confirm.validator";
import { MatDialog } from "@angular/material/dialog";
import { SignupModalComponent } from "../../modals/signup-modal/signup-modal.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  accounts: Account[] = [];

  public signupForm!: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username : [
        '',
        [
          Validators.pattern(/^[A-Za-z]*$/),
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required
        ]
      ],
      password: [
        '',
        [
          passwordValidator(),
          Validators.required
        ]
      ],
      passwordConfirm: ['']
      },
      { validators: passwordConfirmValidator('password', 'passwordConfirm')}
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get username() {
    return this.signupForm.get('username')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm')!;
  }

  private signupModal(): void {
    this.matDialog.open(SignupModalComponent, {panelClass: 'custom-dialog-container'});
  }

}
