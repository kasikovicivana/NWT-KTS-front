import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveReportComponent } from './drive-report.component';

describe('DriveReportComponent', () => {
  let component: DriveReportComponent;
  let fixture: ComponentFixture<DriveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
