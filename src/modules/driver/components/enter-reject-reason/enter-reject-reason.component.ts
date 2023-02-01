import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../../shared/services/drive-service/drive.service';

@Component({
  selector: 'app-enter-reject-reason',
  templateUrl: './enter-reject-reason.component.html',
  styleUrls: ['./enter-reject-reason.component.css'],
})
export class EnterRejectReasonComponent implements OnInit {
  @Input() drive: Drive | undefined = undefined;
  @Output() closeRejectModal = new EventEmitter<boolean>();
  public reason: string = '';
  constructor(private driveService: DriveService) {}

  ngOnInit(): void {}

  close() {
    this.closeRejectModal.emit();
  }

  reject() {
    //odbij
    if (this.drive != undefined) {
      this.drive.rejectionReason = this.reason;
      this.driveService.setRejectionReason(this.drive).subscribe();
    }
  }
}