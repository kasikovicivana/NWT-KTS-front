import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from '../../../app/model/notification.model';

@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.css'],
})
export class NotificationTableComponent implements OnInit {
  @Input() notifications: NotificationModel[] = [];

  constructor() {}

  ngOnInit(): void {}

  sendToApprove(driveId: number) {
    window.location.href = '/approveDrivePayment/' + driveId;
  }
}
