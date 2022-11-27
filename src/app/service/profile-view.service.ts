import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const newUrl =
      this.url + '/getClient/' + this.loginService.getLoggedUserEmail();
    const header = this.loginService.getAuthorizationHeader();
    return this._http.get<any>(newUrl, { headers: header });
  }

  saveClient(client: Client) {
    const newUrl = this.url + '/saveClient';
    const header = this.loginService.getAuthorizationHeader();
    return this._http.post<any>(newUrl, client, { headers: header });
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
