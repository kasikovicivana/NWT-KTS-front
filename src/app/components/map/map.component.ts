import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | L.LayerGroup | any;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [8.686507, -49.41943],
      zoom: 8,
    });

    this.map.flyTo([49.41943, 8.686507], 16);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.mapService.getData().subscribe((data) => {
      console.log(data);
      let path = L.geoJSON(data).addTo(this.map);
    });
  }
}
