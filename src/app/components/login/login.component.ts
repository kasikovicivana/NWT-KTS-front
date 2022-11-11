import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _http: HttpClient) { /* TODO document why this constructor is empty */  }

  ngOnInit(): any {
    console.log('doslo');
    return this._http.get<any>(environment.backendUrl + 'api/user/getUser').subscribe();
  }

}
