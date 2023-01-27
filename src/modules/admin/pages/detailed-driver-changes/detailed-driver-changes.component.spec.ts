import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDriverChangesComponent } from './detailed-driver-changes.component';

describe('DetailedDriverChangesComponent', () => {
  let component: DetailedDriverChangesComponent;
  let fixture: ComponentFixture<DetailedDriverChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedDriverChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedDriverChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
