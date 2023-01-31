import { Component, OnInit } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../../shared/services/drive-service/drive.service';

@Component({
  selector: 'app-view-future-drives',
  templateUrl: './view-future-drives.component.html',
  styleUrls: ['./view-future-drives.component.css'],
})
export class ViewFutureDrivesComponent implements OnInit {
  public drives: Drive[] = [];
  showRejectModal: boolean = false;
  drive: Drive = new Drive();
  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    this.getFutureDrives();
  }

  getFutureDrives() {
    this.driveService.getFutureDriverDrives().subscribe({
      next: (data) => {
        this.drives = data;
        this.convertToDate();
        this.sortByDate();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  convertToDate() {
    for (let drive of this.drives) {
      let date = drive.startTime.toString();
      let comp = date.split(',');
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

  openRejectModal(drive: Drive) {
    this.showRejectModal = true;
    this.drive = drive;
  }
}
