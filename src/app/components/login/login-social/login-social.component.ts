import { Component, Input, OnInit } from '@angular/core';
import { SocialUser } from "@abacritt/angularx-social-login";
import { LoggedUser, User, UserInfo } from "src/app/model/user.model";
import { RegistrationService } from "src/app/service/registration.service";
import { AlertsService } from "src/app/service/alerts.service";
import { LoginService } from "src/app/service/login.service";

@Component({
  selector: 'app-login-social',
  templateUrl: './login-social.component.html',
  styleUrls: ['./login-social.component.css']
})
export class LoginSocialComponent implements OnInit {

  @Input()
  socialUser!: SocialUser;

  user = new User();
  phoneNumberPattern=/^(\+)?\d{8}\d+$/;

  constructor(private registrationService:RegistrationService, private loginService: LoginService,private alerts:AlertsService) { }

  ngOnInit(): void {
    this.user.name = this.socialUser.firstName;
    this.user.surname = this.socialUser.lastName;
    this.user.email = this.socialUser.email;
    this.user.role = 'Client';
    this.user.password = this.socialUser.id;
    this.user.photo = this.socialUser.photoUrl;
  }

  login(){
    if(this.user.city != '' && this.user.phoneNumber != '' && this.user.cardNumber != '' && this.phoneNumberPattern.test(this.user.phoneNumber)){
      this.registrationService.registerUser(this.user).subscribe(
        (data) => {
          this.loginUser()
        },
        (err) => this.alerts.errorAlert('Something went wrong!')
      );
    }else{
      this.alerts.errorAlert('You must fill all fields!');
    }
  }

  loginUser(){
    let info = new UserInfo();
    info.username = this.user.email;
    info.password = this.user.password;
    this.loginService.login(info).subscribe(
      (data) => {
        this.alerts.successAlert();
        this.loginSuccessful(data)
        //idi dalje
      },
      (err) => this.alerts.errorAlert('Wrong credentials!')
    )
  }

  loginSuccessful(response:LoggedUser){
    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("expiresIn", response.expiresIn);
    sessionStorage.setItem("role", response.role);
    sessionStorage.setItem("username", response.userEmail);
  }

}