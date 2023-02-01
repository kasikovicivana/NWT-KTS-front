import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteModalComponent } from './favourite-modal.component';

describe('FavouriteModalComponent', () => {
  let component: FavouriteModalComponent;
  let fixture: ComponentFixture<FavouriteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
