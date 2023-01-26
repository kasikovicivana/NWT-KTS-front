import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriveHistoryComponent } from './admin-drive-history.component';

describe('AdminDriveHistoryComponent', () => {
  let component: AdminDriveHistoryComponent;
  let fixture: ComponentFixture<AdminDriveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDriveHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDriveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
