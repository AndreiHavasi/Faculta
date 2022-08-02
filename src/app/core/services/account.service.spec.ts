import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { TestScheduler } from "rxjs/testing";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Account } from "../classes/account";

describe('AccountService', () => {
  let service: AccountService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and
      .returnValue(of({status_code: 200, account: { username: 'admin', password: 'Rentitadmin.2022', loggedIn: false, id: 0 }}))
  });

  beforeEach(() => scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('accounts should be fetched - subscribe and assert testing', (done) => {
    const expectedAccounts: Account[] = [{ username: 'admin', password: 'Rentitadmin.2022', loggedIn: false, id: 0 }];
    service.getAccounts().subscribe(fetchedAccounts => {
      expect(fetchedAccounts).toEqual(expectedAccounts);
      done();
    });
  });

  it('accounts should be fetched - marble testing', fakeAsync(() => {
    scheduler.run(({expectObservable}) => {
      const expectedMarble = '(a|)';
      const expectedAccounts = {a: [{ username: 'admin', password: 'Rentitadmin.2022', loggedIn: false, id: 0 }]};

      service.getAccounts().subscribe(fetchedAccounts => {
        expectObservable(of(fetchedAccounts)).toBe(expectedMarble, expectedAccounts);
      })
      flush();
    });
  }));

});
