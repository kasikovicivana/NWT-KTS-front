import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url = environment.backendUrl + 'api/notification';

  constructor(private _http: HttpClient) {}

  getNotificationsOfLoggedClient() {
    const newUrl = this.url + '/getNotifications';
    return this._http.get<any>(newUrl);
  }
}
