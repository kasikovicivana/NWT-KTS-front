import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Client } from "../model/client.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {

  constructor(private _http:HttpClient) {}

  url = environment.backendUrl + 'api/user';

  getLoggedUserInfo(){
    const newUrl = this.url + '/getClient';
    return this._http.get<any>(newUrl);
  }

  saveClient(client: Client){
    const newUrl = this.url + '/saveClient';
    return this._http.post<any>(newUrl,client);
  }

  changePassword(newPassword: string){
    const newUrl = this.url + '/changePassword';
    return this._http.post<any>(newUrl,newPassword);
  }

  isOldPasswordCorrect(oldPassword: string){
    const newUrl = this.url + '/checkOldPassword';
    return this._http.post<any>(newUrl,oldPassword);
  }


}

