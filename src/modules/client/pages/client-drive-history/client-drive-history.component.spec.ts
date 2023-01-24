import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDriveHistoryComponent } from './client-drive-history.component';

describe('ClientDriveHistoryComponent', () => {
  let component: ClientDriveHistoryComponent;
  let fixture: ComponentFixture<ClientDriveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDriveHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDriveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
