import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveHistoryTableComponent } from './drive-history-table.component';

describe('DriveHistoryTableComponent', () => {
  let component: DriveHistoryTableComponent;
  let fixture: ComponentFixture<DriveHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
