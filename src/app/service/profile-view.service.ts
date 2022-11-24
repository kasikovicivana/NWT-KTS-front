import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Client } from '../model/client.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileViewService {
  constructor(private _http: HttpClient, private loginService: LoginService) {}

  url = environment.backendUrl + 'api/user';

  getLoggedUserInfo() {
    const newUrl = this.url + '/getClient';
    // const header = this.loginService.getAuthorizationHeader();
    return this._http.get<any>(newUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      }),
    });
  }

  saveClient(client: Client) {
    const newUrl = this.url + '/saveClient';
    // const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, client, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
      }),
    });
  }

  changePassword(newPassword: string) {
    const newUrl = this.url + '/changePassword';
    return this._http.post<any>(newUrl, newPassword);
  }

  isOldPasswordCorrect(oldPassword: string) {
    const newUrl = this.url + '/checkOldPassword';
    return this._http.post<any>(newUrl, oldPassword);
  }
}
