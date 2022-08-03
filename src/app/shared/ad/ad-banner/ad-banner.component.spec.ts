import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AdBannerComponent } from './ad-banner.component';
import { SharedModule } from "../../shared.module";
import { CarComponent } from "../car.component";

describe('AdBannerComponent', () => {
  let component: AdBannerComponent;
  let fixture: ComponentFixture<AdBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ AdBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdBannerComponent);
    component = fixture.componentInstance;

    component.ads = [
      {
        component: CarComponent,
        data: {
          headline: 'Ad1',
          body: 'Ad1 body'
        }
      },
      {
        component: CarComponent,
        data: {
          headline: 'Ad2',
          body: 'Ad2 body'
        }
      },
      {
        component: CarComponent,
        data: {
          headline: 'Ad3',
          body: 'Ad3 body'
        }
      }
    ]

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ads every 3000ms', fakeAsync(() => {
    const loadComponentSpy = spyOn(component, 'loadComponent');

    component.ngOnInit();
    expect(loadComponentSpy).toHaveBeenCalled();
    loadComponentSpy.calls.reset();

    tick(2999);
    expect(loadComponentSpy).not.toHaveBeenCalled();
    tick(1);
    expect(loadComponentSpy).toHaveBeenCalled();
    loadComponentSpy.calls.reset();

    tick(3000);
    expect(loadComponentSpy).toHaveBeenCalled();

    discardPeriodicTasks();
  }));

  it('ad viewContainer should clear every 3000ms', fakeAsync(() => {
    const viewContainerSpy = spyOn(component.appAd.viewContainerRef, 'clear');

    component.ngOnInit();
    expect(viewContainerSpy).toHaveBeenCalled();
    viewContainerSpy.calls.reset();

    tick(2999);
    expect(viewContainerSpy).not.toHaveBeenCalled();
    tick(1);
    expect(viewContainerSpy).toHaveBeenCalled();
    viewContainerSpy.calls.reset();

    tick(3000);
    expect(viewContainerSpy).toHaveBeenCalled();

    discardPeriodicTasks();
  }));

  it('viewContainer ad Component data should change every 3000ms', fakeAsync(() => {
    let adComponentRef = component.adComponentRef;
    spyOn(component, 'loadComponent').and.callThrough();

    expect(adComponentRef?.instance.data).toEqual({headline: 'Ad1', body: 'Ad1 body'});

    tick(2999);
    expect(adComponentRef?.instance.data).toEqual({headline: 'Ad1', body: 'Ad1 body'});
    tick(1);
    expect(adComponentRef?.instance.data).toEqual({headline: 'Ad2', body: 'Ad2 body'});

    discardPeriodicTasks();
  }));

});
