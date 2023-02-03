import { Component, EventEmitter, Output } from '@angular/core';
import { RouteDetails } from '../../../app/model/routeDetails';
import { RouteParams } from '../../../app/model/route-params';

@Component({
  selector: 'app-collapse-list',
  templateUrl: './collapse-list.component.html',
  styleUrls: ['./collapse-list.component.css'],
})
export class CollapseListComponent {
  @Output() changeRoute = new EventEmitter<RouteParams>();

  positions: string[] = [];
  routes: RouteDetails[][] = [];
  chosen: string[] = [];

  selectRoute(i: number, route: string) {
    this.chosen[i] = route;
    const params: RouteParams = new RouteParams(i, route);
    this.changeRoute.emit(params);
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
