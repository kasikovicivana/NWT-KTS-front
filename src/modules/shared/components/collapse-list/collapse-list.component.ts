import { Component, EventEmitter, Output } from '@angular/core';
import { RouteDetails } from '../../../app/model/routeDetails';

@Component({
  selector: 'app-collapse-list',
  templateUrl: './collapse-list.component.html',
  styleUrls: ['./collapse-list.component.css'],
})
export class CollapseListComponent {
  @Output() changeRoute = new EventEmitter<any>();

  positions: string[] = [];
  routes: RouteDetails[][] = [];
  chosen: string[] = [];

  constructor() {}

  selectRoute(i: number, route: string) {
    this.chosen[i] = route;
    this.changeRoute.emit({ i, route });
  }

  showRouteOptions(routes: RouteDetails[][], positions: string[]) {
    if (routes.length < positions.length - 1) {
      return;
    }
    this.routes = routes;
    this.positions = positions;
    this.chosen = [];
    routes.forEach(() => {
      this.chosen.push('recommended');
    });
  }
}
