import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() openModal = new EventEmitter<boolean>();
  isMyChoice: boolean = false;
  isLoggedIn: boolean = false;
  pins: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('username') != null;
  }

  addPin() {
    this.pins.push('');
  }

  removePin(i: number) {
    this.pins.splice(i, 1);
  }

  openStepperModal() {
    this.openModal.emit(true);
  }
}
