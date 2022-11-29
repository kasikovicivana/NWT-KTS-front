import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AlertsService } from 'src/app/service/alerts.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+)*@[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?(\.[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?)*$/;
  phoneNumberPattern = /^(\+)?\d{8}\d+$/;
  isDriver = true;
  user = new User();
  reenteredPassword = '';
  isDataValid = true;

  constructor(
    private registrationService: RegistrationService,
    private alerts: AlertsService
  ) {}

  ngOnInit(): void {}

  onChange(deviceValue: string) {
    this.isDriver = deviceValue !== 'Client';
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
    if (this.user.role === 'Client') {
      this.isDataValid = this.isDataValid && this.user.cardNumber != '';
    }
  }

  register() {
    console.log(this.user.role);
    this.validateData();
    if (this.isDataValid) {
      this.registrationService.registerUser(this.user).subscribe(
        (data) => {
          this.alerts.successAlert();
          setTimeout(() => window.location.href = '/', 1000);
        },
        (err) => this.alerts.errorAlert('You already have account!')
      );
    } else {
      this.alerts.errorAlert('You must fill all fields!');
    }
  }
}
