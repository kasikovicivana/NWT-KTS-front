import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/modules/app/service/login-service/login.service';
import { DriverService } from '../../../shared/services/driver-service/driver.service';
import { UserService } from '../../../shared/services/user-service/user.service';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('activeButton') activeButton!: ElementRef;

  role: string | null = '';
  active = true;

  constructor(
    private loginService: LoginService,
    private driverService: DriverService,
    private userService: UserService,
    private alertService: AlertsService
  ) {
    this.role = sessionStorage.getItem('role');
  }

  logout() {
    if (this.active) {
      this.driverService.changeDriverActivity(true).subscribe();
    }
    this.loginService.logOut();
  }

  changeDriverActivity() {
    this.driverService.changeDriverActivity(this.active).subscribe({
      next: () => {
        this.changeActiveButtonText();
      },
    });
  }

  changeActiveButtonText() {
    if (this.activeButton.nativeElement.innerHTML === 'Inactive') {
      this.activeButton.nativeElement.innerHTML = 'Active';
      this.active = true;
    } else {
      this.activeButton.nativeElement.innerHTML = 'Inactive';
      this.active = false;
    }
  }

  showLeaveReportModal() {
    this.userService.getLoggedClient().subscribe({
      next: (data) => {
        if (data.driving) {
          window.location.href = '/leaveReport';
        } else {
          this.alertService.errorAlert('You are not driving currently');
        }
      },
    });
  }
}
