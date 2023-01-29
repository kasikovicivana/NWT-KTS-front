import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DriverRoutes } from '../../../app/model/driverRoutes.model';
import { Drive } from '../../../app/model/drive.model';
import { Report } from '../../../app/model/report.model';

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

  getClientDriveHistory() {
    return this._http.get<Drive[]>(this.url + '/getAllClientDrives');
  }

  getDriverDriveHistory() {
    return this._http.get<Drive[]>(this.url + '/getAllDriverDrives');
  }

  getDriveHistory() {
    return this._http.get<Drive[]>(this.url + '/getAll');
  }

  getClientDrivesByDate(dates: Report) {
    return this._http.post<Drive[]>(this.url + '/getAllByClientDate', dates);
  }

  getDriverDrivesByDate(dates: Report) {
    return this._http.post<Drive[]>(this.url + '/getAllByDriverDate', dates);
  }

  getDrivesByDate(dates: Report) {
    return this._http.post<Drive[]>(this.url + '/getAllByDate', dates);
  }

  getDrivePriceForClient(id: number) {
    return this._http.get<number>(this.url + '/getDrivePriceByClient/' + id);
  }
}
