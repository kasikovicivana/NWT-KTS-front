import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDrivesTableComponent } from './current-drives-table.component';

describe('CurrentDrivesTableComponent', () => {
  let component: CurrentDrivesTableComponent;
  let fixture: ComponentFixture<CurrentDrivesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDrivesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentDrivesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
