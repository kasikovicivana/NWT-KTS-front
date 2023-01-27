import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTypeInfoComponent } from './car-type-info.component';

describe('CarTypeInfoComponent', () => {
  let component: CarTypeInfoComponent;
  let fixture: ComponentFixture<CarTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarTypeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
