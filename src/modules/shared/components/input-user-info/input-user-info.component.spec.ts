import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUserInfoComponent } from './input-user-info.component';

describe('InputUserInfoComponent', () => {
  let component: InputUserInfoComponent;
  let fixture: ComponentFixture<InputUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
