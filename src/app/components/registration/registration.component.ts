import { Component, OnInit } from '@angular/core';
import { User } from "src/app/model/user.model";
import { AlertsService } from "src/app/service/alerts.service";
import { RegistrationService } from "src/app/service/registration.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  expression = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  isDriver = true;
  user = new User();
  reenteredPassword = '';
  isDataValid = true;

  constructor(private registrationService: RegistrationService,private alerts: AlertsService) { }

  ngOnInit(): void {}

  onChange(deviceValue: String) {
    this.isDriver = deviceValue !== 'Client';
  }

  validateData(){
    this.isDataValid =
      this.user.name != '' &&
      this.user.surname != '' &&
      this.user.email != '' &&
      this.user.phoneNumber != '' &&
      this.user.city != '' &&
      this.user.password != '' &&
      this.user.role != '' &&
      this.expression.test(this.user.email);
    if(this.user.role === 'Client'){
      this.isDataValid = this.isDataValid && this.user.cardNumber != '';
    }
  }

  register(){
    console.log(this.user.role);
    this.validateData();
    if(this.isDataValid){
      this.registrationService.registerUser(this.user).subscribe(
        (data) => {
          this.alerts.successAlert();
          setTimeout(function (){window.location.href='/'},1000);
        },
        (err) => this.alerts.errorAlert('You already have account!')
      );
    }else{
      this.alerts.errorAlert('You must fill all fields!');
    }

  }

}
