import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DriverRoutes } from '../../../app/model/driverRoutes.model';

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  url = environment.backendUrl + 'api/drive';

  constructor(private _http: HttpClient) {}

  loadDrives() {
    return this._http.get<Set<DriverRoutes>>(this.url + '/current');
  }

  loadPositions() {
    return this._http.get<any>(this.url + '/positions');
  }
}
