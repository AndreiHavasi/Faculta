import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "../../../models/account";
import { Subject, throwError } from "rxjs";
import { AuthService } from "../../../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from "../../modals/login-modal/login-modal.component";
import { TokenService } from "../../../services/token.service";

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
    private authService: AuthService,
    private matDialog: MatDialog,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getAccessToken()) {
      this.router.navigate(['/home']);
    }
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

  onLogin() {
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe({
      next: (response: any) => {
        this.tokenService.saveAccessToken(response['accessToken']);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if([401, 403].includes(err.status))
          this.loginModal();
        throwError(err);
      },
    });
    this.loginForm.reset();
  }

  private loginModal(): void {
    this.matDialog.open(LoginModalComponent,{panelClass: 'custom-dialog-container'});
  }

}
