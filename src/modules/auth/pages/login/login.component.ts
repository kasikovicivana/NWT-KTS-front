import { Component, OnInit } from '@angular/core';
import { LoggedUser, UserInfo } from 'src/modules/app/model/user.model';
import { LoginService } from 'src/modules/app/service/login-service/login.service';
import { AlertsService } from 'src/modules/shared/services/alerts-service/alerts.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MailModalComponent } from '../../../app/components/mail-modal/mail-modal.component';
import { UserService } from '../../../shared/services/user-service/user.service';
import { DriverService } from '../../../shared/services/driver-service/driver.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MdbModalService],
})
export class LoginComponent implements OnInit {
  userInfo = new UserInfo();
  socialUser!: SocialUser;
  isLoggedIn?: boolean = false;
  isRegistered?: boolean = false;
  modalRef: MdbModalRef<MailModalComponent> | null = null;

  constructor(
    private socialAuthService: SocialAuthService,
    private loginService: LoginService,
    private userService: UserService,
    private driverService: DriverService,
    private alerts: AlertsService,
    private modalService: MdbModalService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedIn = user != null;
      if (this.isLoggedIn) {
        this.userService.getUser(this.socialUser.email).subscribe(
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

          setTimeout(() => this.redirectToHomepage(data.role), 1000);
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

  redirectToHomepage(role: string) {
    if (role === 'ROLE_client') {
      window.location.href = '/home';
    } else if (role === 'ROLE_driver') {
      this.driverService.changeDriverActivity(false).subscribe(() => {
        window.location.href = '/driverProfile';
      });
    } else if (role === 'ROLE_admin') {
      window.location.href = '/adminHomepage';
    } else {
      window.location.href = '/home';
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

  openMailModal() {
    this.modalRef = this.modalService.open(MailModalComponent, {
      data: { title: 'Enter your email address' },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }
}
