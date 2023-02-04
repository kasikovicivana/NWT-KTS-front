import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private alerts: AlertsService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.alerts.errorAlert("Passwords don't match!");
    } else if (this.newPassword === '') {
      this.alerts.errorAlert('You must enter the password!');
    } else {
      this.userService.resetPassword(this.token, this.newPassword).subscribe({
        next: () => {
          this.alerts.successAlert();
          setTimeout(function () {
            window.location.href = '/';
          }, 2000);
        },
        error: (err) => {
          console.log(err);
          this.alerts.errorAlert("Password couldn't be reset.");
        },
      });
    }
  }
}
