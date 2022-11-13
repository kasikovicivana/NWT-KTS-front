import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserInfo } from "src/app/model/user.model";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userInfo = new UserInfo();

  constructor(private loginService: LoginService) {}

  ngOnInit(): any {
    console.log('doslo');
    //return this._http.get<any>(environment.backendUrl + 'api/user/getUser').subscribe();
  }

  login(){
    console.log(this.userInfo.email)
      this.loginService.login(this.userInfo).subscribe(
        (data) => (console.log("da"+data)),
        (err) => (console.log("ne"+err)),
      );
  }

}
