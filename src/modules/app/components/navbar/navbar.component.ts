import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/modules/app/service/login-service/login.service';
import { DriverService } from '../../../shared/services/driver-service/driver.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('activeButton') activeButton!: ElementRef;

  role: string | null = '';
  active: boolean = false;

  constructor(
    private loginService: LoginService,
    private driverService: DriverService
  ) {
    this.role = sessionStorage.getItem('role');
  }

  logout() {
    if (this.active) {
      this.driverService.changeDriverActivity(false);
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
    if (this.activeButton.nativeElement.innerHTML === 'Active') {
      this.activeButton.nativeElement.innerHTML = 'Inactive';
      this.active = true;
    } else {
      this.activeButton.nativeElement.innerHTML = 'Active';
      this.active = false;
    }
  }
}
