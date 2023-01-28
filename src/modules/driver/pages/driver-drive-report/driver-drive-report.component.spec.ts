import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDriveReportComponent } from './driver-drive-report.component';

describe('DriverDriveReportComponent', () => {
  let component: DriverDriveReportComponent;
  let fixture: ComponentFixture<DriverDriveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDriveReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDriveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
