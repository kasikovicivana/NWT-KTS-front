import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from '../../../app/service/login-service/login.service';
import { LoggedUser } from '../../../app/model/user.model';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: any;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj<LoginService>(['login']);
    //window.onbeforeunload = jasmine.createSpy();
    const router = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        OverlayModule,
        FormsModule,
        MdbValidationModule,
        MdbFormsModule,
      ],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '876431757912-4d80ppb585036idf1r63oild8lled1un.apps.googleusercontent.com'
                ),
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('2042751709255530'),
              },
            ],
          } as SocialAuthServiceConfig,
        },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', fakeAsync(() => {
    component.userInfo.username = '';
    component.userInfo.password = '';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTruthy();
    flush();
  }));

  it('form should be valid', fakeAsync(() => {
    component.userInfo.username = 'maki@sas';
    component.userInfo.password = 'pass';

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#loginButton'));
    expect(button.nativeElement.disabled).toBeFalsy();
    flush();
  }));

  it('display email error msg when email is blank', () => {
    const user = fixture.debugElement.query(By.css('#email'));

    component.userInfo.username = '';
    user.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));

    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.query(By.css('mdb-error'));
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.nativeElement.innerHTML).toContain(
      'Email is required'
    );
  });

  it('display password error msg when password is blank', () => {
    const user = fixture.debugElement.query(By.css('#pass'));

    component.userInfo.password = '';
    user.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));

    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.query(By.css('mdb-error'));
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.nativeElement.innerHTML).toContain(
      'Password is required'
    );
  });

  it('login should be called', fakeAsync(() => {
    const loggedUser = new LoggedUser();
    loginServiceSpy.login.and.returnValue(
      new Observable((subscriber) => {
        subscriber.next(loggedUser);
      })
    );

    component.userInfo.username = 'maki@sas';
    component.userInfo.password = 'pass';

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#loginButton'));

    button.nativeElement.click();
    fixture.detectChanges();
    expect(loginServiceSpy.login).toHaveBeenCalled();
    spyOn(component, 'redirectToHomepage');
    flush();
  }));
});
