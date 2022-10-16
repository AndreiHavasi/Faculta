import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CoreModule } from "../../../core.module";
import { AccountService } from "../../../services/account.service";
import { isEmpty, of, Subject, takeUntil } from "rxjs";
import { Account } from "../../../models/account";

import { TestScheduler } from "rxjs/testing";

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountService: AccountService;

  let scheduler: TestScheduler;

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

  beforeEach(() => scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('accounts should be fetched', () => {
    expect(component.accounts.length).toBeGreaterThan(0);
  });

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

  it('form should submit on button press', waitForAsync(() => {
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

  it('login modal should pop up if logging account is not signed up 1', fakeAsync(() => {
    const notSignedUpAccount = new Account ('qwe', 'asd', false);
    spyOn(component['matDialog'], 'open');

    component['login'](notSignedUpAccount);
    tick();
    expect(component['matDialog'].open).toHaveBeenCalled();
  }));

  it('login modal should pop up if logging account is not signed up 2',fakeAsync(() => {
    const notSignedUpAccount = new Account ('qwe', 'asd', false);

    // no dialog open at init
    expect(component['matDialog'].openDialogs).toEqual([]);

    // dialog open after login
    component['login'](notSignedUpAccount);
    tick();
    expect(component['matDialog'].openDialogs).toHaveSize(1);
  }));

  it('login modal should pop up if logging account is not signed up 3',fakeAsync(() => {
    let testFinished$: Subject<boolean> = new Subject();

    const notSignedUpAccount = new Account ('qwe', 'asd', false);
    const afterOpenedSubjectIsEmpty = component['matDialog'].afterOpened.pipe(isEmpty(), takeUntil(testFinished$));

    // initial value should be false
    afterOpenedSubjectIsEmpty.subscribe(next => {
      expect(next).toBeFalse();
    })

    // value after wrong log in should be true
    component['login'](notSignedUpAccount);
    tick();
    afterOpenedSubjectIsEmpty.subscribe(next => {
      expect(next).toBeTrue();
    })

    testFinished$.next(true);
    testFinished$.complete();
  }));

  it('login modal should pop up if logging account is not signed up 4',fakeAsync(() => {
    const notSignedUpAccount = new Account ('qwe', 'asd', false);

    scheduler.run(({expectObservable}) => {
      const afterOpenedSubjectIsEmpty = component['matDialog'].afterOpened.pipe(isEmpty());
      const expectedMarble = '(a|)';
      let expectedValue = {a: false};

      afterOpenedSubjectIsEmpty.subscribe(next => {
        expectObservable(of(next)).toBe(expectedMarble, expectedValue);
      });

      component['login'](notSignedUpAccount);
      tick();
      expectedValue = {a: true};
      afterOpenedSubjectIsEmpty.subscribe(next => {
        expectObservable(of(next)).toBe(expectedMarble, expectedValue);
      });

    });
  }));

});
