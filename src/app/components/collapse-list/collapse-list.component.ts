import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-list',
  templateUrl: './collapse-list.component.html',
  styleUrls: ['./collapse-list.component.css'],
})
export class CollapseListComponent implements OnInit {
  active: string = 'route_2';

  constructor() {}

  ngOnInit(): void {}

  selectRoute(route: string) {
    this.active = route;
  }
}
