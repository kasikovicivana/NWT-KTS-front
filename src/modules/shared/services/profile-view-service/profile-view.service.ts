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
    const header = this.loginService.getAuthorizationHeader();
    return this._http.get<any>(newUrl, { headers: header });
  }

  getLoggedUser() {
    const newUrl = this.url + '/getLoggedUser';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.get<any>(newUrl, { headers: header });
  }

  changePassword(newPassword: string) {
    const newUrl = this.url + '/changePassword';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, newPassword, { headers: header });
  }

  isOldPasswordCorrect(oldPassword: string) {
    const newUrl = this.url + '/checkOldPassword';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, oldPassword, { headers: header });
  }
}
