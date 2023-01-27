import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../app/model/user.model';

@Component({
  selector: 'app-input-user-info',
  templateUrl: './input-user-info.component.html',
  styleUrls: ['./input-user-info.component.css'],
})
export class InputUserInfoComponent implements OnInit {
  constructor() {}

  @Input()
  user = new User();
  reenteredPassword = '';
  isDriver = true;

  ngOnInit(): void {}

  onChange(deviceValue: string) {
    this.isDriver = deviceValue !== 'Client';
  }
}
