import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChatBoxComponent } from './admin-chat-box.component';

describe('AdminChatBoxComponent', () => {
  let component: AdminChatBoxComponent;
  let fixture: ComponentFixture<AdminChatBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChatBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChatBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
