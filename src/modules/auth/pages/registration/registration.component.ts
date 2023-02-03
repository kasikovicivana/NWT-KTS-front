import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/modules/app/model/user.model';
import { AlertsService } from 'src/modules/shared/services/alerts-service/alerts.service';
import { RegistrationService } from 'src/modules/app/service/registration-service/registration.service';
import { InputUserInfoComponent } from '../../../shared/components/input-user-info/input-user-info.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+)*@[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?(\.[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?)*$/;
  phoneNumberPattern = /^(\+)?\d{8}\d+$/;
  user: User = new User();
  isDataValid = false;
  @ViewChild(InputUserInfoComponent) child: InputUserInfoComponent | undefined;

  constructor(
    private registrationService: RegistrationService,
    private alerts: AlertsService
  ) {}

  ngOnInit(): void {
    this.user.role = 'Client';
    this.isDataValid = this.user.name != '';
  }

  validateData() {
    this.isDataValid =
      this.user.name != '' &&
      this.user.surname != '' &&
      this.user.email != '' &&
      this.user.phoneNumber != '' &&
      this.user.city != '' &&
      this.user.password != '' &&
      this.user.role != '' &&
      this.emailPattern.test(this.user.email) &&
      this.phoneNumberPattern.test(this.user.phoneNumber);
  }

  register() {
    this.validateData();
    if (this.isDataValid) {
      this.registrationService.registerUser(this.user).subscribe(
        () => {
          this.alerts.successAlert();
          setTimeout(() => this.redirectToHomepage(), 1000);
        },
        () => this.alerts.errorAlert('You already have account!')
      );
    } else {
      this.alerts.errorAlert('You must fill all fields!');
    }
  }

  redirectToHomepage() {
    window.location.href = '/';
  }
}
