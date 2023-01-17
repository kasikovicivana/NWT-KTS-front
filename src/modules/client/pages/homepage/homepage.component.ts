import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  showModal: boolean = false;
  loggedUserRole: string | null = sessionStorage.getItem('role');

  constructor() {}

  setShowModalToFalse() {
    this.showModal = false;
  }

  setShowModalToTrue() {
    this.showModal = true;
  }
}
