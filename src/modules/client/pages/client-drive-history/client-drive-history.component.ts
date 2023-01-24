import { Component, OnInit } from '@angular/core';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-client-drive-history',
  templateUrl: './client-drive-history.component.html',
  styleUrls: ['./client-drive-history.component.css'],
})
export class ClientDriveHistoryComponent implements OnInit {
  public drives: Set<Drive> = new Set<Drive>();
  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    this.driveService.getClientDriveHistory().subscribe(
      (data) => {
        console.log(data);
        this.drives = data;
      },
      (err) => console.log(err)
    );
  }
}
