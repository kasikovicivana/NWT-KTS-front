import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTokensComponent } from './purchase-tokens.component';

describe('PurchaseTokensComponent', () => {
  let component: PurchaseTokensComponent;
  let fixture: ComponentFixture<PurchaseTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTokensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
