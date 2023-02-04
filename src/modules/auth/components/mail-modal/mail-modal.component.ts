import { Component, EventEmitter, Output } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css'],
})
export class MailModalComponent {
  mail = '';
  @Output() closeMail = new EventEmitter<boolean>();

  constructor(
    private alerts: AlertsService,
    private userService: UserService
  ) {}

  close(): void {
    this.closeMail.emit(true);
  }

  sendMail() {
    this.userService.sendPasswordReset(this.mail).subscribe({
      next: () => {
        this.alerts.successAlert();
        this.close();
      },
      error: () => {
        this.alerts.errorAlert('Could not send an email to the given address.');
        this.close();
      },
    });
  }
}
