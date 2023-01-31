import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterRejectReasonComponent } from './enter-reject-reason.component';

describe('EnterRejectReasonComponent', () => {
  let component: EnterRejectReasonComponent;
  let fixture: ComponentFixture<EnterRejectReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterRejectReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterRejectReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
