import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapseListComponent } from './collapse-list.component';

describe('CollapseListComponent', () => {
  let component: CollapseListComponent;
  let fixture: ComponentFixture<CollapseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
