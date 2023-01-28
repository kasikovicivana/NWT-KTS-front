import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DriverCarInfo } from '../../../app/model/driver.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewDriverChangesService {
  basicUrl = environment.backendUrl + 'api/user';

  constructor(private _http: HttpClient) {}

  getDriverChangesById(id: number) {
    const payUrl = this.basicUrl + `/getDriverChanges/` + id;
    return this._http.get<any>(payUrl);
  }

  accept(info: DriverCarInfo) {
    const payUrl = this.basicUrl + `/acceptDriverChanges`;
    return this._http.post<any>(payUrl, info);
  }

  reject(info: DriverCarInfo) {
    const payUrl = this.basicUrl + `/rejectDriverChanges`;
    return this._http.post<any>(payUrl, info);
  }
}