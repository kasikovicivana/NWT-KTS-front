import { Component, ViewChild } from '@angular/core';
import { MapService } from '../../../shared/services/map-service/map.service';
import { Position } from '../../../app/model/position.model';
import { RouteDetails } from '../../../app/model/routeDetails';
import { RouteMapComponent } from '../../components/route-map/route-map.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  showModal: boolean = false;
  loggedUserRole: string | null = sessionStorage.getItem('role');
  chosenRoutes: RouteDetails[] = [];

  allRoutes: RouteDetails[][] = [];
  distance: number = 0;

  @ViewChild(RouteMapComponent) mapChild: RouteMapComponent | undefined;
  @ViewChild(SideBarComponent) sidebar: SideBarComponent | undefined;

  constructor(private mapService: MapService) {}

  setShowModalToFalse() {
    this.showModal = false;
  }

  setShowModalToTrue() {
    //this.sidebar?.calculateDistance(this.chosenRoutes);
    this.distance = 0;
    this.chosenRoutes.forEach((r) => {
      this.distance += r.distance;
    });
    this.showModal = true;
  }

  async showPositions(positions: string[]) {
    this.chosenRoutes = [];
    let coordinates: Position[] = [];

    for (let pos of positions) {
      let { lat, lon } = await this.mapService.getCoordinates(pos);
      coordinates.push(new Position({ lat, lon }));
    }

    let routes: RouteDetails[][] = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      let routeRecommended: RouteDetails = new RouteDetails(
        await this.mapService.getRouteDetails(
          coordinates[i],
          coordinates[i + 1],
          'recommended'
        )
      );
      let routeFastest: RouteDetails = new RouteDetails(
        await this.mapService.getRouteDetails(
          coordinates[i],
          coordinates[i + 1],
          'fastest'
        )
      );
      let routeShortest: RouteDetails = new RouteDetails(
        await this.mapService.getRouteDetails(
          coordinates[i],
          coordinates[i + 1],
          'shortest'
        )
      );
      let routeList: RouteDetails[] = [];
      routeList.push(routeRecommended);
      routeList.push(routeFastest);
      routeList.push(routeShortest);
      routes.push(routeList);
      this.chosenRoutes.push(routeRecommended);
    }

    this.sidebar?.showRouteOptions(routes);

    this.mapChild?.showStops(coordinates, positions);
    this.mapChild?.showRoutes(routes);

    this.allRoutes = routes;
  }

  changeRouteType(params: any) {
    for (let r of this.allRoutes[params.i]) {
      if (r.type == params.route) {
        this.chosenRoutes[params.i] = r;
        break;
      }
    }

    this.mapChild?.displayRoute(this.chosenRoutes[params.i], params.i);
  }

  finish(params: any) {
    // imamo sve parametre, saljemo na  bek..
  }
}
