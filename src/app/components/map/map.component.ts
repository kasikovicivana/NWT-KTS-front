import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { MapService } from '../../service/map.service';
import { DriveService } from '../../service/drive.service';
import 'leaflet.animatedmarker/src/AnimatedMarker.js';
import 'leaflet.motion/dist/leaflet.motion.js';
import { DriverRoutes } from '../../model/driverRoutes.model';
import 'leaflet.marker.slideto';
import 'leaflet-extra-markers';
import { Route } from '../../model/route.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup | any;
  private positions = new Map<string, Marker>();

  private m: Marker | null = null;

  constructor(
    private mapService: MapService,
    private driveService: DriveService
  ) {}

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [49.41943, 1.686507],
      zoom: 8,
    });

    this.map.flyTo([45.2484513, 19.8487313], 14, {
      animate: true,
      duration: 2.5,
    });

    L.marker([49.41943, 8.686507]).addTo(this.map);

    const greenIcon = new L.Icon({
      iconUrl: './assets/markers/marker-icon-green.png',
      shadowUrl: './assets/markers/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([49.41461, 8.681495], { icon: greenIcon })
      .addTo(this.map)
      .bindPopup('Start')
      .openPopup();

    const redIcon = new L.Icon({
      iconUrl: './assets/markers/marker-icon-red.png',
      shadowUrl: './assets/markers/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([49.420318, 8.687872], { icon: redIcon })
      .addTo(this.map)
      .bindPopup('End');

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
      }
    );

    tiles.addTo(this.map);

    this.mapService.getData().subscribe((data) => {
      let path = L.geoJSON(data).addTo(this.map);
      data.features[0].geometry.coordinates.forEach((c: any[]) => {
        c.reverse();
      });
    });

    this.load();
  }

  load(): void {
    const greenMarker = L.ExtraMarkers.icon({
      icon: 'fa-car',
      markerColor: 'green',
      iconColor: 'white',
      shape: 'circle',
      prefix: 'fa',
    });

    this.driveService.loadPositions().subscribe({
      next: (values) => {
        for (let key in values) {
          const item = values[key];
          let marker = L.marker([item.lat, item.lon], { icon: greenMarker })
            .addTo(this.map)
            .bindPopup(key);
          this.positions.set(key, marker);
        }
      },
      error: (err) => {},
    });

    this.driveService.loadDrives().subscribe({
      next: (values) => {
        for (let v of values) {
          this.simulate(new DriverRoutes(v)).then((value) => {});
        }
      },
      error: (err) => {},
    });
  }

  async simulate(value: DriverRoutes): Promise<void> {
    let data = await this.getData(value);
    const coordinates = data.coordinates;
    const duration = data.duration;
    await this.moveCar(value.username, coordinates, duration);
  }

  private async moveCar(
    username: string,
    coordinates: number[][],
    duration: number
  ) {
    var redMarker = L.ExtraMarkers.icon({
      icon: 'fa-car',
      markerColor: 'red',
      iconColor: 'white',
      shape: 'circle',
      prefix: 'fa',
    });

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
            removeOnEnd: true,
            showMarker: true,
            icon: redMarker,
          }
        )
        .addTo(this.map);

      a.bindPopup(username);
    }
  }

  private async getData(value: DriverRoutes) {
    const start: Date = new Date(
      value.start[0],
      value.start[1] - 1,
      value.start[2],
      value.start[3],
      value.start[4]
    );

    let coordinates: number[][] = [];
    let duration = 0;
    const now = new Date();

    for (let r of value.routes) {
      let rCoordinates: number[][] = [];
      let rDuration = 0;

      let data = await this.getRouteData(r, now, start, duration);
      rCoordinates = (data as any).rCoordinates;
      rDuration = (data as any).routeDuration;
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
