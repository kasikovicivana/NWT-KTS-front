import { Component, OnInit } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../../shared/services/drive-service/drive.service';

@Component({
  selector: 'app-driver-drive-history',
  templateUrl: './driver-drive-history.component.html',
  styleUrls: ['./driver-drive-history.component.css'],
})
export class DriverDriveHistoryComponent implements OnInit {
  public drives: Drive[] = [];
  showModal = false;
  drive: Drive = new Drive();
  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    this.driveService.getDriverDriveHistory().subscribe(
      (data) => {
        this.drives = data;
        this.convertToDate();
        this.sortByDate();
      },
      (err) => console.log(err)
    );
  }

  convertToDate() {
    for (const drive of this.drives) {
      const date = drive.startTime.toString();
      const comp = date.split(',');
      drive.startTime = new Date(
        parseFloat(comp[0]),
        parseFloat(comp[1]) - 1,
        parseFloat(comp[2])
      );
    }
  }

  sortByDate() {
    this.drives.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
  }

  openModal(drive: Drive) {
    this.showModal = true;
    this.drive = drive;
  }
}
