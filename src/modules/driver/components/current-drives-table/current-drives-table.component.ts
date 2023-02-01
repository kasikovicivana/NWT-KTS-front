import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../../shared/services/drive-service/drive.service';

@Component({
  selector: 'app-current-drives-table',
  templateUrl: './current-drives-table.component.html',
  styleUrls: ['./current-drives-table.component.css'],
})
export class CurrentDrivesTableComponent implements OnInit {
  @Input() drives: Drive[] = [];
  @Output() openRejectModal = new EventEmitter<Drive>();
  public firstDrive: number = -1;

  constructor(private driveService: DriveService) {}

  ngOnInit(): void {
    if (this.drives.length !== 0) {
      let date: Date = new Date(Date.parse(this.drives[0].createdTime));
      this.firstDrive = this.drives[0].id;
      for (let d of this.drives) {
        let newDate: Date = new Date(Date.parse(d.createdTime));
        if (newDate.valueOf() < date.valueOf()) {
          this.firstDrive = d.id;
          date = newDate;
        }
      }
    }
  }

  openRejectModalFunc(drive: Drive) {
    this.openRejectModal.emit(drive);
  }

  goToClient(drive: Drive) {
    //pokrece praznu voznju
    //setuj na going to client
    drive.status = 'GOING_TO_CLIENT';
    this.driveService.goToClient(drive).subscribe();
  }

  start(drive: Drive) {
    //setuje status
    // pokrece
    drive.status = 'IN_PROGRESS';
    drive.startTime = new Date();
    this.driveService.start(drive).subscribe();
  }

  stop(drive: Drive) {
    drive.status = 'STOPPED';
    this.driveService.stop(drive).subscribe();
  }

  finish(drive: Drive) {
    drive.status = 'FINISHED';
    this.driveService.finish(drive).subscribe();
  }
}