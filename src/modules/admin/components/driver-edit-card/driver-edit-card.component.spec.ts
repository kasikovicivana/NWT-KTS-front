import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditCardComponent } from './driver-edit-card.component';

describe('DriverEditCardComponent', () => {
  let component: DriverEditCardComponent;
  let fixture: ComponentFixture<DriverEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
