import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeModalComponent } from './grade-modal.component';

describe('GradeModalComponent', () => {
  let component: GradeModalComponent;
  let fixture: ComponentFixture<GradeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
