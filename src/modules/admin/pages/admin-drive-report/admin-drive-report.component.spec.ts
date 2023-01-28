import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriveReportComponent } from './admin-drive-report.component';

describe('AdminDriveReportComponent', () => {
  let component: AdminDriveReportComponent;
  let fixture: ComponentFixture<AdminDriveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDriveReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDriveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
