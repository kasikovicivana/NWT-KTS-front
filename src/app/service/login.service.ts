import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.backendUrl + 'auth/login';
  getUserUrl = environment.backendUrl + 'api/user/getUser/';

  constructor(private _http: HttpClient) {}

  login(userInfo: UserInfo) {
    return this._http.post<any>(this.loginUrl, userInfo);
  }

  getUser(email: string) {
    return this._http.get<any>(this.getUserUrl + email);
  }

  logOut(): void {
    sessionStorage.clear();
    window.location.href = '/';
  }

  getAuthorizationHeader() {
    console.log(sessionStorage.getItem('accessToken'));
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
    });
  }
}
