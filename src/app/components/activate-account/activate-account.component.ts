import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { AlertsService } from '../../service/alerts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivateAccountComponent implements OnInit {
  token: string = '';

  constructor(
    private registrationService: RegistrationService,
    private alerts: AlertsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.registrationService.activateAccount(this.token).subscribe(
      (data) => {
        this.alerts.successAlert();
        setTimeout(function () {
          window.location.href = '/';
        }, 2000);
      },
      (err) => {
        if (err) {
          this.alerts.errorAlert('Activation failed!'); // treba provjeriti status - 400/401/403
          setTimeout(function () {
            window.location.href = '/';
          }, 2000);
        }
      }
    );
  }
}
