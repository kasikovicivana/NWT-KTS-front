import { Component } from '@angular/core';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-client-drive-report',
  templateUrl: './client-drive-report.component.html',
  styleUrls: ['./client-drive-report.component.css'],
})
export class ClientDriveReportComponent {
  drives: Drive[] = [];

  constructor(public driveService: DriveService) {}
}
