import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertsService } from '../../service/alerts.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-mail-modal',
  templateUrl: './mail-modal.component.html',
  styleUrls: ['./mail-modal.component.css'],
})
export class MailModalComponent implements OnInit {
  mail: string = '';

  constructor(
    public modalRef: MdbModalRef<MailModalComponent>,
    private alerts: AlertsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  sendMail() {
    this.userService.sendPasswordReset(this.mail).subscribe({
      next: (value) => {
        this.alerts.successAlert();
        this.close();
      },
      error: (err) => {
        this.close();
        this.alerts.errorAlert('Could not send an email to the given address.');
      },
    });
  }
}
