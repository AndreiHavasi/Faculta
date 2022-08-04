import { TestBed } from '@angular/core/testing';

import { NetworkInterceptor } from './network.interceptor';
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

describe('NetworkInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworkInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NetworkInterceptor = TestBed.inject(NetworkInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should intercept', (done) => {
    const interceptor: NetworkInterceptor = TestBed.inject(NetworkInterceptor);
    spyOn(interceptor["loadingService"], 'show');

    const requestMock = new HttpRequest('GET', 'api/orders');
    const next: any = {
      handle: () => {
        return Observable.create((subscriber: { complete: () => void; }) => {
          subscriber.complete();
        });
      }
    };

    interceptor.intercept(requestMock, next).subscribe(
      next => {},
      error => {},
      () => {
        expect(interceptor["loadingService"].show).toHaveBeenCalled();
        done();
      }
    )
  });
});
