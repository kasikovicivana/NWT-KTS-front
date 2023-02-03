import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { Drive } from '../../../app/model/drive.model';
import { ReportModel } from '../../../app/model/report,model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-leave-current-drive-comment',
  templateUrl: './leave-current-drive-comment.component.html',
  styleUrls: ['./leave-current-drive-comment.component.css'],
})
export class LeaveCurrentDriveCommentComponent implements OnInit {
  @Output() closeReportModal = new EventEmitter<boolean>();
  public drive: Drive = new Drive();
  public comment: string = '';

  constructor(
    private driveService: DriveService,
    private alerts: AlertsService
  ) {}

  ngOnInit(): void {
    this.driveService.getCurrentDrive().subscribe({
      next: (data) => {
        this.drive = data;
        console.log(this.drive);
      },
    });
  }

  save() {
    let report: ReportModel = { driveId: this.drive.id, comment: this.comment };
    this.driveService.saveReport(report).subscribe();
    this.alerts.successAlert();
    window.location.href = '/home';
  }

  close() {
    this.closeReportModal.emit();
  }
}
