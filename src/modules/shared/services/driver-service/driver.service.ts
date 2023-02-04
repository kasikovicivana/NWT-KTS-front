import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../../../app/model/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  url = environment.backendUrl + 'api/driver';

  constructor(private _http: HttpClient) {}

  getDriverById(id: number) {
    const newUrl = this.url + '/getDriver/' + id;
    return this._http.get<Driver>(newUrl);
  }

  isActive() {
    const newUrl = this.url + '/isActive';
    return this._http.get<boolean>(newUrl);
  }

  changeDriverActivity(active: boolean) {
    const newUrl = this.url + '/changeDriverActivity';
    return this._http.post<boolean>(newUrl, active);
  }

  getDriver() {
    const newUrl = this.url + '/getDriver';
    return this._http.get<Driver>(newUrl);
  }
}
