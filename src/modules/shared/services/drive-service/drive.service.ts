import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DriverRoutes } from '../../../app/model/driverRoutes.model';
import { Drive } from '../../../app/model/drive.model';
import { Report } from '../../../app/model/report.model';
import { ClientDriveModel } from '../../../app/model/clientDrive.model';
import { ScheduleInfo } from '../../../app/model/schedule-info';
import { ReportModel } from '../../../app/model/report,model';
import { Position } from '../../../app/model/position.model';
import { MapService } from '../map-service/map.service';

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  url = environment.backendUrl + 'api/drive';

  constructor(private _http: HttpClient, private mapService: MapService) {}

  loadDrives() {
    return this._http.get<Set<DriverRoutes>>(this.url + '/current');
  }

  loadPositionsActive() {
    return this._http.get<Map<string, Position>>(this.url + '/positionsActive');
  }

  loadPositionsInactive() {
    return this._http.get<Map<string, Position>>(
      this.url + '/positionsInactive'
    );
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
    return this._http.post<string>(this.url + '/saveDrive', info);
  }

  checkIfAllApproved(id: number) {
    return this._http.get<VoidFunction>(this.url + '/checkIfAllApproved/' + id);
  }

  getFutureDriverDrives() {
    return this._http.get<Drive[]>(this.url + '/getFutureDriverDrives');
  }

  setRejectionReason(reason: Drive) {
    return this._http.post<string>(
      this.url + '/saveRejectionDriveReason',
      reason
    );
  }

  goToClient(drive: Drive, duration: number) {
    return this._http.post<string>(this.url + '/goToClient', {
      drive,
      duration,
    });
  }

  getDuration(drive: Drive, position: Position): Promise<number> {
    return new Promise((resolve) => {
      this.mapService
        .getRoute(position, drive.routes[0].start, 'recommended')
        .subscribe({
          next: (value) => {
            let duration: number =
              value.features[0].properties.summary.duration;
            duration = Math.round((duration / 60) * 10) / 10;
            resolve(duration);
          },
        });
    });
  }

  start(drive: Drive) {
    return this._http.post<string>(this.url + '/start', drive.id);
  }

  stop(drive: Drive) {
    return this._http.post<string>(this.url + '/stop', drive.id);
  }

  finish(drive: Drive) {
    return this._http.post<string>(this.url + '/finish', drive.id);
  }

  getFavouriteDrives() {
    return this._http.get<Drive[]>(this.url + '/getFavouriteDrives');
  }

  getCurrentDrive() {
    return this._http.get<Drive>(this.url + '/getCurrentDrive');
  }

  saveReport(report: ReportModel) {
    return this._http.post<string>(this.url + '/saveReport', report);
  }
}
