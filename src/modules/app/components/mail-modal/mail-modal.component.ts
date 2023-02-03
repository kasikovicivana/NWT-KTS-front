import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css'],
})
export class MailModalComponent {
  mail = '';

  constructor(
    public modalRef: MdbModalRef<MailModalComponent>,
    private alerts: AlertsService,
    private userService: UserService
  ) {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  sendMail() {
    this.userService.sendPasswordReset(this.mail).subscribe({
      next: () => {
        this.alerts.successAlert();
        this.close();
      },
      error: () => {
        this.close();
        this.alerts.errorAlert('Could not send an email to the given address.');
      },
    });
  }
}
