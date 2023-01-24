import { Component, Input, OnInit } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-drive-history-table',
  templateUrl: './drive-history-table.component.html',
  styleUrls: ['./drive-history-table.component.css'],
})
export class DriveHistoryTableComponent implements OnInit {
  @Input() drives: Set<Drive> = new Set<Drive>();

  constructor() {}

  ngOnInit(): void {}
}
