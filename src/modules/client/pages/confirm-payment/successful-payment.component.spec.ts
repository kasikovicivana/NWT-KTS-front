import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulPaymentComponent } from './successful-payment.component';

describe('SuccessfulPaymentComponent', () => {
  let component: SuccessfulPaymentComponent;
  let fixture: ComponentFixture<SuccessfulPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
