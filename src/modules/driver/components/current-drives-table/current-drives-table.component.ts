import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-current-drives-table',
  templateUrl: './current-drives-table.component.html',
  styleUrls: ['./current-drives-table.component.css'],
})
export class CurrentDrivesTableComponent implements OnInit {
  @Input() drives: Drive[] = [];
  @Output() openRejectModal = new EventEmitter<Drive>();

  constructor() {}

  ngOnInit(): void {
    for (let d of this.drives) {
      for (let r of d.routes) {
        console.log(r.start);
      }
    }
  }

  openRejectModalFunc(drive: Drive) {
    this.openRejectModal.emit(drive);
  }

  goToClient(drive: Drive) {}
}
