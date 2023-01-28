import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../../../app/model/car.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  url = environment.backendUrl + 'api/driver';

  constructor(private _http: HttpClient) {}

  getDriverById(id: number) {
    const newUrl = this.url + '/getDriver/' + id;
    return this._http.get<any>(newUrl);
  }

  isActive() {
    const newUrl = this.url + '/isActive';
    return this._http.get<any>(newUrl);
  }

  findActiveDriver(car: CarModel) {
    const newUrl = this.url + '/getActiveDriver';
    return this._http.post<any>(newUrl, car);
  }

  changeDriverActivity(active: boolean) {
    const newUrl = this.url + '/changeDriverActivity';
    return this._http.post<any>(newUrl, active);
  }
}
