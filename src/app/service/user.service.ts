import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.backendUrl + 'api/user';

  constructor(private _http: HttpClient) {}

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
}
