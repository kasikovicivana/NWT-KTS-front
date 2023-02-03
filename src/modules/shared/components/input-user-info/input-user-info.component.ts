import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../app/model/user.model';

@Component({
  selector: 'app-input-user-info',
  templateUrl: './input-user-info.component.html',
  styleUrls: ['./input-user-info.component.css'],
})
export class InputUserInfoComponent {
  @Input()
  user = new User();
  @Output() registerClick = new EventEmitter<boolean>();
  reenteredPassword = '';
  isDriver = true;
  loggedRole: string | null = sessionStorage.getItem('role');

  onChange(deviceValue: string) {
    this.isDriver = deviceValue !== 'Client';
  }

  register() {
    this.registerClick.emit(true);
  }
}
