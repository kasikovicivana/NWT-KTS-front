import { Component } from '@angular/core';
import { LoginService } from 'src/modules/app/service/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  role: string | null = '';

  constructor(private loginService: LoginService) {
    this.role = sessionStorage.getItem('role');
  }

  logout() {
    this.loginService.logOut();
  }
}
