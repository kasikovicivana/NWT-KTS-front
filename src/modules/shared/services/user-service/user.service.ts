import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../../app/service/login-service/login.service';
import { Client } from '../../../app/model/client.model';
import { Driver, DriverCarInfo } from '../../../app/model/driver.model';
import { User } from '../../../app/model/user.model';

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

  getUser(email: string) {
    let getUserUrl = environment.backendUrl + 'api/user/getUser/';
    return this._http.get<any>(getUserUrl + email);
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
      //      headers: this.loginService.getAuthorizationHeader(),
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
      //      headers: this.loginService.getAuthorizationHeader(),
      observe: 'response' as 'body',
      params: new HttpParams()
        .set('page', String(page))
        .append('size', String(size)),
    };
    return this._http.get<any>(newUrl, queryParams);
  }

  saveClient(client: Client) {
    const newUrl = this.url + '/saveClient';
    return this._http.post<string>(newUrl, client);
  }

  saveDriver(driver: Driver) {
    const newUrl = this.url + '/saveDriver';
    return this._http.post<string>(newUrl, driver);
  }

  getLoggedAdmin() {
    const newUrl = this.url + '/getLoggedAdmin';
    return this._http.get<User>(newUrl);
  }

  getLoggedClient() {
    const newUrl = this.url + '/getClient';
    return this._http.get<Client>(newUrl);
  }

  getClientByMail(mail: string) {
    const newUrl = this.url + '/getClient/' + mail;
    return this._http.get<Client>(newUrl);
  }

  changePassword(newPassword: string) {
    const newUrl = this.url + '/changePassword';
    return this._http.post<string>(newUrl, newPassword);
  }

  isOldPasswordCorrect(oldPassword: string) {
    const newUrl = this.url + '/checkOldPassword';
    return this._http.post<boolean>(newUrl, oldPassword);
  }

  saveUser(user: User) {
    console.log(user);
    if (user.role === 'Client') {
      const newUrl = this.url + '/saveClient';
      return this._http.post<string>(newUrl, user);
    } else if (user.role === 'Driver') {
      const newUrl = this.url + '/saveDriver';
      return this._http.post<string>(newUrl, user);
    } else {
      const newUrl = this.url + '/saveAdmin';
      return this._http.post<string>(newUrl, user);
    }
  }

  saveEditDriver(user: DriverCarInfo) {
    const newUrl = this.url + '/saveEditDriver';
    return this._http.post<boolean>(newUrl, user);
  }

  getDriverCarInfo() {
    const newUrl = this.url + '/getDriverCarInfo';
    return this._http.get<any>(newUrl);
  }

  getPendingDriverChanges(page: number, size: number) {
    const newUrl = this.url + '/getPendingDriverChanges';
    let queryParams = {
      observe: 'response' as 'body',
      params: new HttpParams()
        .set('page', String(page))
        .append('size', String(size)),
    };

    return this._http.get<HttpResponse<DriverCarInfo[]>>(newUrl, queryParams);
  }
}
