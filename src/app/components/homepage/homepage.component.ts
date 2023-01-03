import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  showModal: boolean = false;
  active: string = 'route_2';
  isLoggedIn: boolean = false;
  pins: Array<string> = [];

  constructor() {}

  ngOnInit(): void {}

  setShowModalToFalse() {
    this.showModal = false;
  }

  setShowModalToTrue() {
    this.showModal = true;
  }
}
