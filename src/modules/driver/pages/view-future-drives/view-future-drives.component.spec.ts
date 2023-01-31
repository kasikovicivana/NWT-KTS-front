import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFutureDrivesComponent } from './view-future-drives.component';

describe('ViewFutureDrivesComponent', () => {
  let component: ViewFutureDrivesComponent;
  let fixture: ComponentFixture<ViewFutureDrivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFutureDrivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFutureDrivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
