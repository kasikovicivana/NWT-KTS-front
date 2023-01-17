import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockCardComponent } from './user-block-card.component';

describe('UserBlockCardComponent', () => {
  let component: UserBlockCardComponent;
  let fixture: ComponentFixture<UserBlockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlockCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBlockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
