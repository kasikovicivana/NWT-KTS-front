import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  active: string = 'route_2';
  isLoggedIn: boolean = false;
  pins: Array<string> = [];
  showModal: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('username') != null;
  }

  selectRoute(route: string) {
    this.active = route;
  }

  addPin() {
    this.pins.push('');
  }

  removePin(i: number) {
    this.pins.splice(i, 1);
  }

  receiveMessage($event: string) {
    this.showModal = false;
  }
}
