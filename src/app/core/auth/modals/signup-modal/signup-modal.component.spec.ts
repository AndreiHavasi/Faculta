import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModalComponent } from './signup-modal.component';
import { AppModule } from "../../../../app.module";

describe('SignupModalComponent', () => {
  let component: SignupModalComponent;
  let fixture: ComponentFixture<SignupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [ SignupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
