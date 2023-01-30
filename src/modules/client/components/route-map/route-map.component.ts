import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { RouteDetails } from '../../../app/model/routeDetails';
import { MapService } from '../../../shared/services/map-service/map.service';
import { Position } from '../../../app/model/position.model';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css'],
})
export class RouteMapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup | any;
  private displayedRoutes: any[] = [];

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

  constructor(private mapService: MapService) {}

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
}
