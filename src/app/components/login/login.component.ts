import { Component, OnInit } from '@angular/core';
import { LoggedUser, UserInfo } from 'src/app/model/user.model';
import { LoginService } from 'src/app/service/login.service';
import { AlertsService } from 'src/app/service/alerts.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userInfo = new UserInfo();
  socialUser!: SocialUser;
  isLoggedIn?: boolean = false;
  isRegistered?: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private loginService: LoginService,
    private alerts: AlertsService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedIn = user != null;
      if (this.isLoggedIn) {
        this.loginService.getUser(this.socialUser.email).subscribe(
          (data) => {
            this.isRegistered = true;
            this.userInfo.username = this.socialUser.email;
            this.userInfo.password = this.socialUser.id;
            this.login();
          },
          (err) => console.log(err)
        );
      }
    });
  }

  login() {
    if (this.userInfo.username != '' && this.userInfo.password != '') {
      this.loginService.login(this.userInfo).subscribe(
        (data) => {
          this.alerts.successAlert();
          this.loginSuccessful(data);
        },
        (err) => {
          this.alerts.errorAlert('Wrong credentials!');
          this.isLoggedIn = false;
          this.userInfo = new UserInfo();
        }
      );
    } else {
      this.alerts.errorAlert('You must enter email and password!');
    }
  }

  loginSuccessful(response: LoggedUser) {
    if (response == null) {
      this.alerts.errorAlert('Verify account first!');
    } else {
      sessionStorage.setItem('accessToken', response.accessToken);
      sessionStorage.setItem('expiresIn', response.expiresIn);
      sessionStorage.setItem('role', response.role);
      sessionStorage.setItem('username', response.userEmail);
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((r) => {});
  }

  loginWithFacebook(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((r) => {});
  }

  logOutSocial(): void {
    this.socialAuthService.signOut().then((r) => {});
  }
}
