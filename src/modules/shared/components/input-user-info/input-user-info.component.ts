import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Output() registerClick = new EventEmitter<boolean>();
  reenteredPassword = '';
  isDriver = true;
  loggedRole: string | null = sessionStorage.getItem('role');

  ngOnInit(): void {}

  onChange(deviceValue: string) {
    this.isDriver = deviceValue !== 'Client';
  }

  register() {
    this.registerClick.emit(true);
  }
}
