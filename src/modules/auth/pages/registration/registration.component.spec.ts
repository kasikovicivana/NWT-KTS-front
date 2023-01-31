import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { InputUserInfoComponent } from '../../../shared/components/input-user-info/input-user-info.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../../app/model/user.model';
import { Observable } from 'rxjs';
import { RegistrationService } from '../../../app/service/registration-service/registration.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationServiceSpy: any;

  function inputValidData() {
    let repass = fixture.debugElement.query(By.css('#reenterPasswordX'));
    repass.nativeElement.value = 'makic';
    repass.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));

    component.user.name = 'Maki';
    component.user.surname = 'Makic';
    component.user.email = 'maki@gmail.com';
    component.user.city = 'Cuprija';
    component.user.phoneNumber = '6052355645';
    component.user.password = 'makic';
  }

  beforeEach(async () => {
    registrationServiceSpy = jasmine.createSpyObj<RegistrationService>([
      'registerUser',
    ]);
    const router = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent, InputUserInfoComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: RegistrationService, useValue: registrationServiceSpy },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent form', () => {
    const userForm = findComponent(fixture, 'app-input-user-info');
    expect(userForm).toBeTruthy();
  });

  it('form should be invalid', fakeAsync(() => {
    component.user.name = '';
    component.user.surname = '';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#reg'));
    expect(button.nativeElement.disabled).toBeTruthy();
    flush();
  }));

  it('form should be valid', fakeAsync(() => {
    inputValidData();

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#reg'));
    expect(button.nativeElement.disabled).toBeFalsy();
    flush();
  }));

  it('display name error msg when name is blank', () => {
    const firstName = fixture.debugElement.query(By.css('#firstName'));

    component.user.name = '';
    firstName.nativeElement.dispatchEvent(
      new Event('input', { bubbles: true })
    );

    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.query(By.css('mdb-error'));
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.nativeElement.innerHTML).toContain(
      'First name is required'
    );
  });

  it('display name error msg when phone num is less than 9 digits', () => {
    const phone = fixture.debugElement.query(By.css('#phoneNumber'));

    phone.nativeElement.value = '65555';
    phone.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.query(By.css('mdb-error'));
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.nativeElement.innerHTML).toContain(
      'Phone number requires min 9 digits'
    );
  });

  it('register should be called', fakeAsync(() => {
    const mockUser = new User();
    registrationServiceSpy.registerUser.and.returnValue(
      new Observable((subscriber) => {
        subscriber.next(mockUser);
      })
    );

    inputValidData();

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('#reg'));

    button.nativeElement.click();
    fixture.detectChanges();
    expect(registrationServiceSpy.registerUser).toHaveBeenCalled();
    spyOn(component, 'redirectToHomepage');
    flush();
  }));
});

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}
