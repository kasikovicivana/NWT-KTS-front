import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDriverChangesComponent } from './review-driver-changes.component';

describe('ReviewDriverChangesComponent', () => {
  let component: ReviewDriverChangesComponent;
  let fixture: ComponentFixture<ReviewDriverChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDriverChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewDriverChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
