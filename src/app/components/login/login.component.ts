import { Component, OnInit } from '@angular/core';
import { LoggedUser, UserInfo } from 'src/app/model/user.model';
import { LoginService } from 'src/app/service/login.service';
import { AlertsService } from "src/app/service/alerts.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userInfo = new UserInfo();

  constructor(private loginService: LoginService,private alerts: AlertsService) {}

  ngOnInit(): any {}

  login() {
    if(this.userInfo.username != '' && this.userInfo.password != ''){
      this.loginService.login(this.userInfo).subscribe(
        (data) => {
          this.alerts.successAlert();
          this.loginSuccessful(data)},
        (err) => this.alerts.errorAlert()
      )
    }else{
      this.alerts.errorAlert();
    }
  }

  loginSuccessful(response:LoggedUser){
    console.log(response);
    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("expiresIn", response.expiresIn);
    sessionStorage.setItem("role", response.role);
    sessionStorage.setItem("username", response.userEmail);
  }
}
