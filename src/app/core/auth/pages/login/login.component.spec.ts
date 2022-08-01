import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from "../../../core.module";
import { AccountService } from "../../../services/account.service";
import { of } from "rxjs";
import { Account } from "../../../classes/account";

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountService: AccountService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    accountService = TestBed.inject(AccountService);
    const accounts: Account[] = [
      { username: 'admin', password: 'Rentitadmin.2022', loggedIn: false, id: 0}
    ];
    spyOn(accountService, "getAccounts").and.returnValue(of(accounts));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accounts should be fetched', fakeAsync(() => {
    expect(component.accounts.length).toBeGreaterThan(0);
  }));

  it('form should be invalid when empty', () => {
    component.username.setValue('');
    component.password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username validity', () => {
    let username = component.username;

    let errors = username.errors || {};
    expect(username.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    username.setValue('abc');
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('password validity', () => {
    let password = component.password;

    let errors = password.errors || {};
    expect(password.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();

    password.setValue('123');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  })

  it('form should submit on button press', async(() => {
    spyOn(component, 'onSubmit');
    const submitButton = fixture.debugElement.nativeElement.querySelector('.btn-primary');
    submitButton.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    })
  }));

  it('logging account should be signed up', fakeAsync(() => {
    const signedUpAccount = new Account ('admin', 'Rentitadmin.2022', false);
    spyOn<any>(component, 'login').and.callThrough();
    spyOn(accountService, 'putAccount').and.returnValue(of(signedUpAccount));

    component['login'](signedUpAccount);
    tick();
    expect(accountService.putAccount).toHaveBeenCalled();
  }));

  it('logging account should not pass if it is not signed up', fakeAsync(() => {
    const notSignedUpAccount = new Account ('qwe', 'asd', false);
    spyOn<any>(component, 'login').and.callThrough();
    spyOn(accountService, 'putAccount');

    component['login'](notSignedUpAccount);
    tick();
    expect(accountService.putAccount).not.toHaveBeenCalled();
  }));


});
