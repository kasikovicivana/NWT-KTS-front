import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginService } from '../../../app/service/login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileViewService {
  url = environment.backendUrl + 'api/user';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getLoggedClient() {
    const newUrl = this.url + '/getClient';
    return this._http.get<any>(newUrl);
  }

  getLoggedUser() {
    const newUrl = this.url + '/getLoggedUser';
    return this._http.get<any>(newUrl);
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
