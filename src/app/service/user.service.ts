import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { Client } from '../model/client.model';
import { Driver } from '../model/driver.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.backendUrl + 'api/user';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  sendPasswordReset(email: string) {
    return this._http.get<HttpStatusCode>(
      `${this.url}/sendPasswordReset/${email}`
    );
  }

  resetPassword(token: string, newPassword: string) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    return this._http.post<HttpStatusCode>(
      `${this.url}/changePassword`,
      newPassword,
      { headers: header }
    );
  }

  getClients(page: number, size: number) {
    const newUrl = this.url + '/getClients';
    let queryParams = {
      headers: this.loginService.getAuthorizationHeader(),
      observe: 'response' as 'body',
      params: new HttpParams()
        .set('page', String(page))
        .append('size', String(size)),
    };

    return this._http.get<HttpResponse<any>>(newUrl, queryParams);
  }

  getDrivers(page: number, size: number) {
    const newUrl = this.url + '/getDrivers';
    let queryParams = {
      headers: this.loginService.getAuthorizationHeader(),
      observe: 'response' as 'body',
      params: new HttpParams()
        .set('page', String(page))
        .append('size', String(size)),
    };
    return this._http.get<any>(newUrl, queryParams);
  }

  saveClient(client: Client) {
    const newUrl = this.url + '/saveClient';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, client, { headers: header });
  }

  saveDriver(driver: Driver) {
    const newUrl = this.url + '/saveDriver';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, driver, { headers: header });
  }

  getLoggedUserInfo() {
    const newUrl = this.url + '/getClient';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.get<any>(newUrl, { headers: header });
  }
}
