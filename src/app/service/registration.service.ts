import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root',
})

export class RegistrationService{

  url = environment.backendUrl + 'auth/register';

  constructor(private _http:HttpClient) {}

  registerUser(user: User){
    return this._http.post<any>(this.url, user);
  }

}
