import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCurrentDriveComment } from './leave-current-drive-comment.component';

describe('LeaveCurrentDriveCommentComponent', () => {
  let component: LeaveCurrentDriveComment;
  let fixture: ComponentFixture<LeaveCurrentDriveComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveCurrentDriveComment],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveCurrentDriveComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
