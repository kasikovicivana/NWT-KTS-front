import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDriveReportComponent } from './client-drive-report.component';

describe('ClientDriveReportComponent', () => {
  let component: ClientDriveReportComponent;
  let fixture: ComponentFixture<ClientDriveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDriveReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDriveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
