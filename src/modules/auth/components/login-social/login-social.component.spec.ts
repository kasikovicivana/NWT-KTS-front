import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSocialComponent } from './login-social.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SocialUser } from '@abacritt/angularx-social-login';

describe('LoginSocialComponent', () => {
  let component: LoginSocialComponent;
  let fixture: ComponentFixture<LoginSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSocialComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSocialComponent);
    component = fixture.componentInstance;
    component.socialUser = new SocialUser();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
