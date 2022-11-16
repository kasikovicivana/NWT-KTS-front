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
  isDriver = true;
  user = new User();
  reenteredPassword = '';

  constructor(private registrationService: RegistrationService,private alerts: AlertsService) { }

  ngOnInit(): void {}

  onChange(deviceValue: String) {
    this.isDriver = deviceValue !== 'Client';
  }

  register(){
    console.log(this.user.role);
    this.registrationService.registerUser(this.user).subscribe(
      (data) => {
        this.alerts.successAlert();
        setTimeout(function (){window.location.href='/'},1000);
        },
      (err) => this.alerts.errorAlert()
    );
  }

}
