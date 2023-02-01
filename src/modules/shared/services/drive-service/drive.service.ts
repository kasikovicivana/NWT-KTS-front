import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DriverRoutes } from '../../../app/model/driverRoutes.model';
import { Drive } from '../../../app/model/drive.model';
import { Report } from '../../../app/model/report.model';
import { ClientDriveModel } from '../../../app/model/clientDrive.model';
import { ScheduleInfo } from '../../../app/model/schedule-info';

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  url = environment.backendUrl + 'api/drive';

  constructor(private _http: HttpClient) {}

  loadDrives() {
    return this._http.get<Set<DriverRoutes>>(this.url + '/current');
  }

  loadPositionsActive() {
    return this._http.get<any>(this.url + '/positionsActive');
  }

  loadPositionsInactive() {
    return this._http.get<any>(this.url + '/positionsInactive');
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
    return this._http.get<ClientDriveModel>(
      this.url + '/getDrivePriceByClient/' + id
    );
  }

  approvePayment(id: number) {
    return this._http.get<VoidFunction>(this.url + '/approvePayment/' + id);
  }

  addDrive(info: ScheduleInfo) {
    return this._http.post<any>(this.url + '/saveDrive', info);
  }

  checkIfAllApproved(id: number) {
    return this._http.get<VoidFunction>(this.url + '/checkIfAllApproved/' + id);
  }

  getFutureDriverDrives() {
    return this._http.get<any>(this.url + '/getFutureDriverDrives');
  }

  setRejectionReason(reason: Drive) {
    return this._http.post<any>(this.url + '/saveRejectionDriveReason', reason);
  }

  goToClient(drive: Drive) {
    return this._http.post<any>(this.url + '/goToClient', drive);
  }

  start(drive: Drive) {
    return this._http.post<any>(this.url + '/start', drive.id);
  }

  stop(drive: Drive) {
    return this._http.post<any>(this.url + '/stop', drive.id);
  }

  finish(drive: Drive) {
    return this._http.post<any>(this.url + '/finish', drive.id);
  }
}
