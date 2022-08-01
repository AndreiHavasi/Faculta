import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { TestScheduler } from "rxjs/testing";

describe('AccountService', () => {
  let service: AccountService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountService);
  });

  beforeEach(() => scheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('accounts should be fetched', () => {
    scheduler.run(({expectObservable}) => {
      const expectedMarble = '(a|)';
      expectObservable(service.getAccounts()).toBe(expectedMarble);
    })
  });

});
