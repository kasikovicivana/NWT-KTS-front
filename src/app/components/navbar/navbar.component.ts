import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  role: string | null = '';

  constructor(private loginService: LoginService) {
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {}

  logout() {
    this.loginService.logOut();
  }
}
