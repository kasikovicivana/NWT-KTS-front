import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserInfo } from "../model/user.model";

@Injectable({
  providedIn: 'root',
})

export class LoginService{

  url = environment.backendUrl + 'auth/login';

  constructor(private _http:HttpClient) {}

  login(userInfo: UserInfo){
    return this._http.post<any>(this.url, userInfo);
  }

}
