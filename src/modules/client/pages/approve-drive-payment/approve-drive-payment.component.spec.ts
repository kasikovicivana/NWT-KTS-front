import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDrivePaymentComponent } from './approve-drive-payment.component';

describe('ApproveDrivePaymentComponent', () => {
  let component: ApproveDrivePaymentComponent;
  let fixture: ComponentFixture<ApproveDrivePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDrivePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveDrivePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
