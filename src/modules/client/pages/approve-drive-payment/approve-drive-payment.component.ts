import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { ClientDriveModel } from '../../../app/model/clientDrive.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-approve-drive-payment',
  templateUrl: './approve-drive-payment.component.html',
  styleUrls: ['./approve-drive-payment.component.css'],
})
export class ApproveDrivePaymentComponent implements OnInit {
  private id: number = -1;
  public info!: ClientDriveModel;

  constructor(
    private route: ActivatedRoute,
    private driveService: DriveService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.driveService.getDrivePriceForClient(this.id).subscribe({
      next: (data) => {
        this.info = data;
      },
    });
  }

  confirm() {
    this.driveService.approvePayment(this.info.id).subscribe({
      next: () => {
        this.alertsService.successAlert();
        //provjeri jesu li svi platili

        window.location.href = '/home';
      },
      error: (err) => {
        this.alertsService.errorAlert("Don't have enough tokens to pay!");
      },
    });
  }
}
