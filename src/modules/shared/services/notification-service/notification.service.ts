import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url = environment.backendUrl + 'api/notification';

  constructor(private _http: HttpClient, private toast: ToastrService) {}

  getNotificationsOfLoggedClient() {
    const newUrl = this.url + '/getNotifications';
    return this._http.get<any>(newUrl);
  }

  showSuccess() {
    this.toast.success('Hello world!', 'Toastr fun!');
  }

  showApprovePaymentNotification(message: string, driveId: number) {
    this.toast
      .success(message + 'To approve click me!', 'Approve payment!')
      .onTap.pipe(take(1))
      .subscribe(() => this.toasterClickedHandler(driveId));
  }

  toasterClickedHandler(driveId: number) {
    window.location.href = '/approveDrivePayment/' + driveId;
  }

  showRejectedPaymentNotification(message: string) {
    this.toast.error(message, 'REJECTED payment!');
  }

  showRejectedDriveNotification(message: string) {
    this.toast.error(message, 'REJECTED drive!');
  }

  showAcceptedDriveNotification(message: string) {
    this.toast.success(message, 'Accepted drive!');
  }

  showReminderNotification(message: string) {
    this.toast.success(message);
  }

  showDriverRejectedNotification(message: string) {
    this.toast.error(message);
  }

  showDriveStartedNotification(message: string) {
    this.toast.success(message, 'Drive started!');
  }

  showDriveStoppedNotification(message: string) {
    this.toast.success(message, 'Drive stopped!');
  }

  showDriveFinishedNotification(message: string) {
    this.toast
      .success(message + ' Click me to grade drive!', 'Drive finished!')
      .onTap.pipe(take(1))
      .subscribe(() => this.grade());
  }

  grade() {
    window.location.href = '/clientHistory';
  }

  showGoingToClientNotification(message: string) {
    this.toast.success(message, 'Vozac stize!');
  }
}
