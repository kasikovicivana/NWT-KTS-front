import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isDriver = true;
  role = 'Driver';
  user = new User();
  reenteredPassword = '';

  constructor() { }

  ngOnInit(): void {}

  onChange(deviceValue: any) {
    console.log(deviceValue);
    this.isDriver = deviceValue !== 'Client';
  }

}
