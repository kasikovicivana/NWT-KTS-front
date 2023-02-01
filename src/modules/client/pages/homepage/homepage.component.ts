import { Component, ViewChild } from '@angular/core';
import { MapService } from '../../../shared/services/map-service/map.service';
import { Position } from '../../../app/model/position.model';
import { RouteDetails } from '../../../app/model/routeDetails';
import { RouteMapComponent } from '../../../shared/components/route-map/route-map.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ScheduleInfo } from '../../../app/model/schedule-info';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { NotificationService } from 'src/modules/shared/services/notification-service/notification.service';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  showModal: boolean = false;
  showFavouriteRoutes: boolean = false;
  loggedUserRole: string | null = sessionStorage.getItem('role');
  chosenRoutes: RouteDetails[] = [];

  allRoutes: RouteDetails[][] = [];
  distance: number = 0;
  duration: number = 0;
  @ViewChild(RouteMapComponent) mapChild: RouteMapComponent | undefined;
  @ViewChild(SideBarComponent) sidebar: SideBarComponent | undefined;
  private stompClient: any;

  constructor(
    private mapService: MapService,
    private driveService: DriveService,
    private notificationService: NotificationService
  ) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:9000/socket');
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null;
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe(
      '/notification/approvePayment',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showApprovePaymentNotification(
            notification.message,
            notification.driveId
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/rejectedPayment',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showRejectedPaymentNotification(
            notification.message
          );
        }
      }
    );

    this.stompClient.subscribe(
      '/notification/noAvailableDriver',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showRejectedDriveNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/approvedDrive',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showAcceptedDriveNotification(
            notification.message
          );
        }
      }
    );

    this.stompClient.subscribe(
      '/notification/reminder',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showReminderNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/driverRejected',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showDriverRejectedNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/driveStarted',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showDriveStartedNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/driveStopped',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showDriveStoppedNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/driveFinished',
      (message: { body: string }) => {
        let notification = JSON.parse(message.body);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showDriveFinishedNotification(
            notification.message
          );
        }
      }
    );
  }

  setShowModalToFalse() {
    this.showModal = false;
  }

  setShowModalToTrue() {
    this.distance = 0;
    this.duration = 0;
    this.chosenRoutes.forEach((r) => {
      this.distance += r.distance;
      this.duration += r.duration;
    });

    this.showModal = true;
  }

  async showPositions(positions: string[]) {
    this.chosenRoutes = [];
    let coordinates: Position[] = [];

    for (let pos of positions) {
      let { lat, lon } = await this.mapService.getCoordinates(pos);
      console.log(pos + ' lat: ' + lat + ' lon: ' + lon);
      coordinates.push(new Position({ lat, lon, address: pos }));
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
    // neko obavjestenje da potvrdi placanjee
    // imamo sve parametre, saljemo na  bek..

    let info: ScheduleInfo = new ScheduleInfo({
      passengers: params.passengers,
      car: params.car,
      babies: params.babies,
      pet: params.pet,
      price: params.price,
      distance: this.distance,
      duration: this.duration,
      splitFaire: !params.alone,
      reservation: params.reserve,
      routes: this.chosenRoutes,
      reservationTime: params.reservationTime,
    });

    this.driveService.addDrive(info).subscribe({
      next: () => {},
      error: () => {},
    });
    // greska.. ??

    this.setShowModalToFalse();
  }

  showFavourites(drives: Drive[]) {
    this.showFavouriteRoutes = true;
  }

  closeFavourites() {
    this.showFavouriteRoutes = false;
  }
}
