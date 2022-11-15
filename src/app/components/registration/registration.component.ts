import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isDriver = true;
  role = 'Driver';
  @ViewChild("cardNum") cardNum: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  onChange(deviceValue: any) {
    console.log(deviceValue);
    if(deviceValue === 'Client'){
      this.isDriver = false;
    }else{
      this.isDriver = true;
    }
  }

}
