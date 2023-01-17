import { Component } from '@angular/core';

@Component({
  selector: 'app-collapse-list',
  templateUrl: './collapse-list.component.html',
  styleUrls: ['./collapse-list.component.css'],
})
export class CollapseListComponent {
  active: string = 'route_2';

  constructor() {}

  selectRoute(route: string) {
    this.active = route;
  }
}
