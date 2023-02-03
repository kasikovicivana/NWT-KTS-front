import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../../../app/model/notification.model';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css'],
})
export class NotificationViewComponent implements OnInit {
  public notifications: NotificationModel[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotificationsOfLoggedClient().subscribe({
      next: (data) => {
        this.notifications = data;
        console.log(data);
        console.log(this.notifications);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
