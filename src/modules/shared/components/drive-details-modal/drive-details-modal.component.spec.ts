import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveDetailsModalComponent } from './drive-details-modal.component';

describe('DriveDetailsModalComponent', () => {
  let component: DriveDetailsModalComponent;
  let fixture: ComponentFixture<DriveDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
