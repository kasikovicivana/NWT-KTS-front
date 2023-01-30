import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTableComponent } from './notification-table.component';

describe('NotificationTableComponent', () => {
  let component: NotificationTableComponent;
  let fixture: ComponentFixture<NotificationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
