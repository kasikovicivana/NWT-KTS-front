import { Component, OnInit } from '@angular/core';
import { DriveService } from '../../../shared/services/drive-service/drive.service';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-client-drive-history',
  templateUrl: './client-drive-history.component.html',
  styleUrls: ['./client-drive-history.component.css'],
})
export class ClientDriveHistoryComponent implements OnInit {
  public drives: Drive[] = [];
  showModal: boolean = false;
  drive: Drive = new Drive();
  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    this.driveService.getClientDriveHistory().subscribe(
      (data) => {
        console.log(data);
        this.drives = data;
        this.convertToDate();
        this.sortByDate();
      },
      (err) => console.log(err)
    );
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

  onChangeSort(sortBy: string) {
    if (sortBy === 'Price') {
      this.drives.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Date') {
      this.sortByDate();
    }
    //jos za rute kad budu dodati nazivi ulice
  }

  openModal(drive: Drive) {
    this.showModal = true;
    this.drive = drive;
  }
}
