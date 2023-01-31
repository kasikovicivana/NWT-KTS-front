import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { RouteDetails } from '../../../app/model/routeDetails';
import { MapService } from '../../services/map-service/map.service';
import { Position } from '../../../app/model/position.model';
import { DriveService } from '../../services/drive-service/drive.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DriverRoutes } from '../../../app/model/driverRoutes.model';
import { Route } from '../../../app/model/route.model';
import 'leaflet-extra-markers';
import 'leaflet.animatedmarker/src/AnimatedMarker.js';
import 'leaflet.motion/dist/leaflet.motion.js';
import 'leaflet.marker.slideto';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css'],
})
export class RouteMapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup | any;
  private displayedRoutes: any[] = [];

  private positions = new Map<string, Marker>();
  private routes = new Map<string, any>();
  private stompClient: any;

  private greenCar: any = L.ExtraMarkers.icon({
    icon: 'fa-car',
    markerColor: 'green',
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  });

  private blackCar: any = L.ExtraMarkers.icon({
    icon: 'fa-car',
    markerColor: 'black',
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  });

  private greenMarker = L.ExtraMarkers.icon({
    icon: 'fa-star',
    markerColor: 'green',
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  });

  private redMarker = L.ExtraMarkers.icon({
    icon: 'fa-star',
    markerColor: 'red',
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  });

  private blueMarker = L.ExtraMarkers.icon({
    icon: 'fa-star',
    markerColor: 'blue',
    iconColor: 'white',
    shape: 'circle',
    prefix: 'fa',
  });

  private stops: Marker[] = [];

  constructor(
    private mapService: MapService,
    private driveService: DriveService
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
      '/map-updates/new-drive',
      (message: { body: string }) => {
        let driverRoutes = JSON.parse(message.body);
        this.positions.get(driverRoutes.username)?.remove();
        this.simulate(driverRoutes).then(() => {});
      }
    );

    this.stompClient.subscribe(
      '/map-updates/stop-drive',
      (message: { body: string }) => {
        let data = JSON.parse(message.body);
        let username: string = '';
        for (let d in data) {
          username = d;
        }
        this.routes.get(username)?.remove();
        this.routes.delete(username);

        this.positions.get(username)?.addTo(this.map);
      }
    );

    this.stompClient.subscribe(
      '/map-updates/finish-drive',
      (message: { body: string }) => {
        let data = JSON.parse(message.body);
        let username: string = '';
        for (let d in data) {
          username = d;
        }
        this.routes.get(username)?.remove();
        this.routes.delete(username);
        let pos: Position = new Position(data[username]);
        this.positions.get(username)?.setLatLng([pos.lat, pos.lon]);
        this.positions.get(username)?.setIcon(this.greenCar);
        this.positions.get(username)?.addTo(this.map);
      }
    );

    this.stompClient.subscribe(
      '/map-updates/driver-active',
      (message: { body: string }) => {
        let username = message.body;
        this.positions.get(username)?.setIcon(this.blackCar);
      }
    );

    this.stompClient.subscribe(
      '/map-updates/driver-not-active',
      (message: { body: string }) => {
        let username = message.body;
        this.routes.delete(username);
        this.positions.get(username)?.setIcon(this.blackCar);
      }
    );
  }

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [49.41943, 1.686507],
      zoom: 8,
    });

    this.map.flyTo([45.2484513, 19.8487313], 14, {
      animate: true,
      duration: 2.5,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
      }
    );

    tiles.addTo(this.map);

    this.load();
  }

  load(): void {
    this.driveService.loadPositionsActive().subscribe({
      next: (values) => {
        for (let key in values) {
          const item = values[key];
          let marker = L.marker([item.lat, item.lon], { icon: this.greenCar })
            .addTo(this.map)
            .bindPopup(key);
          this.positions.set(key, marker);
        }
      },
      error: () => {},
    });

    this.driveService.loadPositionsInactive().subscribe({
      next: (values) => {
        for (let key in values) {
          const item = values[key];
          let marker = L.marker([item.lat, item.lon], { icon: this.blackCar })
            .addTo(this.map)
            .bindPopup(key);
          this.positions.set(key, marker);
        }
      },
      error: () => {},
    });

    this.driveService.loadDrives().subscribe({
      next: (values) => {
        for (let v of values) {
          let rr: DriverRoutes = v;
          console.log(rr);
          this.simulate(v).then(() => {});
        }
      },
      error: () => {},
    });
  }

  async simulate(value: DriverRoutes): Promise<void> {
    let data = await this.getData(value);
    const coordinates = data.coordinates;
    const duration = data.duration;
    this.positions.get(value.username)?.remove();
    await this.moveCar(value.username, coordinates, duration);
  }

  showStops(stops: Position[], names: string[]) {
    for (let m of this.stops) {
      m.remove();
    }
    this.stops = [];

    // pocetna stanica
    let start = L.marker([stops[0].lat, stops[0].lon], {
      icon: this.greenMarker,
    })
      .addTo(this.map)
      .bindPopup(names[0]);
    this.stops.push(start);

    stops.splice(0, 1);
    names.splice(0, 1);

    // posljednja stanica
    let end = L.marker(
      [stops[stops.length - 1].lat, stops[stops.length - 1].lon],
      { icon: this.redMarker }
    )
      .addTo(this.map)
      .bindPopup(names[names.length - 1]);
    this.stops.push(end);

    stops.pop();
    names.pop();

    for (let s in stops) {
      let pos: Position = stops[s];
      let marker = L.marker([pos.lat, pos.lon], { icon: this.blueMarker })
        .addTo(this.map)
        .bindPopup(names[s]);
      this.stops.push(marker);
    }
  }

  showRoutes(routes: RouteDetails[][]) {
    for (let r of this.displayedRoutes) {
      r.remove();
    }
    this.displayedRoutes = [];

    for (let r of routes) {
      this.displayRoute(r[0], routes.indexOf(r));
    }
  }

  displayRoute(r: RouteDetails, index: number) {
    if (this.displayedRoutes.length > index) {
      this.displayedRoutes[index].remove();
    }

    let color: string = '';
    if (r.type == 'recommended') {
      color = '#CC0815';
    } else if (r.type == 'fastest') {
      color = '#0B5CDE';
    } else {
      color = '#ff7800';
    }

    let myLine = [
      {
        type: 'LineString',
        coordinates: r.coordinates,
      },
    ];

    let myStyle = {
      color: color,
      weight: 5,
      opacity: 0.65,
    };

    if (this.displayedRoutes.length > index) {
      this.displayedRoutes[index] = (L as any)
        .geoJSON(myLine, {
          style: myStyle,
        })
        .addTo(this.map);
    } else {
      this.displayedRoutes.push(
        (L as any)
          .geoJSON(myLine, {
            style: myStyle,
          })
          .addTo(this.map)
      );
    }
  }

  private async moveCar(
    username: string,
    coordinates: number[][],
    duration: number
  ) {
    let redMarker = L.ExtraMarkers.icon({
      icon: 'fa-car',
      markerColor: 'red',
      iconColor: 'white',
      shape: 'circle',
      prefix: 'fa',
    });

    if (duration == 0) {
      this.positions.get(username)?.setIcon(redMarker);
      this.positions.get(username)?.addTo(this.map);
    }

    if (coordinates.length > 0) {
      const a = (L as any).motion
        .polyline(
          coordinates,
          {
            color: 'transparent',
          },
          {
            auto: true,
            duration: duration * 1000,
            easing: (L as any).Motion.Ease.easeInOutQuart,
          },
          {
            removeOnEnd: false,
            showMarker: true,
            icon: redMarker,
          }
        )
        .addTo(this.map);

      a.bindPopup(username);
      this.routes.set(username, a);
    }
  }

  private async getData(value: DriverRoutes) {
    const start: Date = new Date(Date.parse(value.startTime));

    let coordinates: number[][] = [];
    let duration = 0;
    const now = new Date();

    for (let r of value.routes) {
      let rCoordinates: number[][] = [];
      let rDuration = 0;

      let data = await this.getRouteData(r, now, start, duration);
      rCoordinates = data.rCoordinates;
      rDuration = data.routeDuration;
      coordinates = [...coordinates, ...rCoordinates];
      duration += rDuration;
    }

    return { coordinates, duration };
  }

  private getRouteData(
    r: Route,
    now: Date,
    start: Date,
    duration: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mapService.getRoute(r.start, r.end, r.type).subscribe({
        next: (response) => {
          const rCoordinates = response.features[0].geometry.coordinates;
          const rDuration = response.features[0].properties.summary.duration;
          const routeStart: Date = new Date(start.getTime() + duration * 1000);
          let routeDuration = 0;

          if (now.valueOf() - routeStart.valueOf() <= rDuration * 1000) {
            rCoordinates.forEach((c: number[]) => {
              c.reverse();
            });
            if (now.valueOf() > routeStart.valueOf()) {
              // pocela je ruta i nije jos zavrsena
              const timePassed = (now.valueOf() - routeStart.valueOf()) / 1000;
              const interval: number = rDuration / rCoordinates.length;
              const intervalsPassed = Math.floor(timePassed / interval);

              rCoordinates.splice(0, intervalsPassed);
              routeDuration = rDuration - timePassed;
            } else {
              // ruta jos nije ni pocela
              routeDuration = rDuration;
            }
          }
          resolve({ rCoordinates, routeDuration });
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
