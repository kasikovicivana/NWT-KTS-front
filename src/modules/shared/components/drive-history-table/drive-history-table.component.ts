import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-drive-history-table',
  templateUrl: './drive-history-table.component.html',
  styleUrls: ['./drive-history-table.component.css'],
})
export class DriveHistoryTableComponent implements OnInit {
  @Input() drives: Drive[] = [];
  @Output() openModal = new EventEmitter<Drive>();

  constructor() {}

  ngOnInit(): void {}

  openDetailsModal(drive: Drive) {
    this.openModal.emit(drive);
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
}
