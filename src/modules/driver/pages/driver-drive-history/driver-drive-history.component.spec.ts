import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDriveHistoryComponent } from './driver-drive-history.component';

describe('DriverDriveHistoryComponent', () => {
  let component: DriverDriveHistoryComponent;
  let fixture: ComponentFixture<DriverDriveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDriveHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDriveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
