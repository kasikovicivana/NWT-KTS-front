import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../../../app/model/position.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

  constructor(private _http: HttpClient) {}

  getData() {
    return this._http.post<any>(
      this.url,
      {
        coordinates: [
          [8.681495, 49.40461],
          [8.686507, 49.41943],
          [8.687872, 49.520318],
        ],
        geometry_simplify: true,
      },
      {
        headers: {
          Authorization:
            '5b3ce3597851110001cf62487e5e4084d501444283da51d998b7cdbd',
        },
      }
    );
  }

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
}
