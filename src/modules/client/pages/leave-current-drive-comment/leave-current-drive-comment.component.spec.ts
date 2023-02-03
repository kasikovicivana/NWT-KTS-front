import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCurrentDriveCommentComponent } from './leave-current-drive-comment.component';

describe('LeaveCurrentDriveCommentComponent', () => {
  let component: LeaveCurrentDriveCommentComponent;
  let fixture: ComponentFixture<LeaveCurrentDriveCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveCurrentDriveCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveCurrentDriveCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
