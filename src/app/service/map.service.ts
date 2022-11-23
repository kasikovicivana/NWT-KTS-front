import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
          [8.681495, 49.41461],
          [8.686507, 49.41943],
          [8.687872, 49.420318],
        ],
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
