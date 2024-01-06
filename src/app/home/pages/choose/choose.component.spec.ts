import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseComponent } from './choose.component';
import { AppModule } from "../../../app.module";

describe('ChooseComponent', () => {
  let component: ChooseComponent;
  let fixture: ComponentFixture<ChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ ChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
