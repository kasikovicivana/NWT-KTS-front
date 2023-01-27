import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveChartComponent } from './drive-chart.component';

describe('DriveChartComponent', () => {
  let component: DriveChartComponent;
  let fixture: ComponentFixture<DriveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriveChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
