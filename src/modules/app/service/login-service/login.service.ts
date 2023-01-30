import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoggedUser, UserInfo } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.backendUrl + 'auth/login';

  constructor(private _http: HttpClient) {}

  login(userInfo: UserInfo) {
    return this._http.post<LoggedUser>(this.loginUrl, userInfo);
  }

  logOut(): void {
    sessionStorage.clear();
    window.location.href = '/';
  }

  // getAuthorizationHeader() {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
  //   });
  // }
}
