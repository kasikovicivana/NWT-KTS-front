import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { ClientDriveModel } from '../../../app/model/clientDrive.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { NotificationService } from '../../../shared/services/notification-service/notification.service';

@Component({
  selector: 'app-approve-drive-payment',
  templateUrl: './approve-drive-payment.component.html',
  styleUrls: ['./approve-drive-payment.component.css'],
})
export class ApproveDrivePaymentComponent implements OnInit {
  public info!: ClientDriveModel;
  private id = -1;
  private stompClient: any;

  constructor(
    private route: ActivatedRoute,
    private driveService: DriveService,
    private alertsService: AlertsService,
    private notificationService: NotificationService
  ) {
    this.initializeWebSocketConnection();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.driveService.getDrivePriceForClient(this.id).subscribe({
      next: (data) => {
        this.info = data;
      },
    });
  }

  initializeWebSocketConnection() {
    const ws = new SockJS('http://localhost:9000/socket');
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe(
      '/notification/rejectedPayment',
      (message: { body: string }) => {
        const notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showRejectedPaymentNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/noAvailableDriver',
      (message: { body: string }) => {
        const notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showRejectedDriveNotification(
            notification.message
          );
        }
      }
    );
    this.stompClient.subscribe(
      '/notification/approvedDrive',
      (message: { body: string }) => {
        const notification = JSON.parse(message.body);
        console.log(notification);
        console.log(notification.message);
        if (sessionStorage.getItem('username') === notification.receiverEmail) {
          this.notificationService.showAcceptedDriveNotification(
            notification.message
          );
        }
      }
    );
  }

  confirm() {
    this.driveService.approvePayment(this.info.id).subscribe({
      next: () => {
        this.alertsService.successAlert();
        //provjeri jesu li svi platili
        this.driveService.checkIfAllApproved(this.info.id).subscribe();
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      },
      error: () => {
        this.alertsService.errorAlert("Don't have enough tokens to pay!");
        setTimeout(() => {
          window.location.href = '/home';
        }, 3000);
      },
    });
  }
}
