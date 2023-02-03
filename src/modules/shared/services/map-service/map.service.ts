import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../../../app/model/position.model';
import { Coordinates } from '../../../app/model/coordinates';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

  addressUrl = 'https://api.openrouteservice.org/geocode/search/structured';

  nominatim = 'https://nominatim.openstreetmap.org/search?';

  constructor(private _http: HttpClient) {}

  getRoute(start: Position, end: Position, type: string) {
    return this._http.post<any>(
      this.url,
      {
        coordinates: [
          [start.lon, start.lat],
          [end.lon, end.lat],
        ],
        geometry_simplify: true,
        preference: type,
      },
      {
        headers: {
          Authorization:
            '5b3ce3597851110001cf62487e5e4084d501444283da51d998b7cdbd',
        },
      }
    );
  }

  getCoordinates(address: string): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      this.getAddressInfo(address).subscribe({
        next: (response) => {
          if (response.features[0] === undefined) {
            resolve({ lat: -1, lon: -1 });
          }
          const lon = response.features[0].geometry.coordinates[0];
          const lat = response.features[0].geometry.coordinates[1];
          resolve(new Coordinates(lat, lon));
        },
      });
    });
  }

  getAddressInfo(address: string) {
    return this._http.get<any>(
      this.nominatim + 'q=' + address + '&format=geojson'
    );
  }

  getRouteDetails(start: Position, end: Position, type: string) {
    return new Promise((resolve, reject) => {
      this.getRoute(start, end, type).subscribe({
        next: (response) => {
          const coordinates: number[][] =
            response.features[0].geometry.coordinates;
          const duration: number =
            response.features[0].properties.summary.duration; // sekunde
          const distance = response.features[0].properties.summary.distance; // metri
          resolve({ coordinates, duration, type, distance, start, end });
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
}
