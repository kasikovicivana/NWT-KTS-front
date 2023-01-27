import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClickEvent } from 'angular-star-rating';
import { GradeService } from '../../../client/services/grade-service/grade.service';
import { GradeModel } from '../../../app/model/grade.model';
import { AlertsService } from '../../services/alerts-service/alerts.service';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-grade-modal',
  templateUrl: './grade-modal.component.html',
  styleUrls: ['./grade-modal.component.css'],
})
export class GradeModalComponent implements OnInit {
  comment: string = '';
  grade!: GradeModel;
  @Input() drive: Drive = new Drive();
  @Output() closeModal = new EventEmitter<void>();
  @Output() closeDetailsModal = new EventEmitter<void>();

  constructor(
    private gradeService: GradeService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.gradeService.getGrade(this.drive.id).subscribe({
      next: (value) => {
        console.log(value);
        this.grade = value;
      },
    });
  }

  rateDriver(info: ClickEvent) {
    this.grade.driverGrade = info.rating;
  }

  rateCar(info: ClickEvent) {
    this.grade.carGrade = info.rating;
  }

  saveGrade() {
    this.gradeService.saveGrade(this.grade).subscribe(() => {
      this.close();
      this.closeDetails();
      setTimeout(() => {
        this.alertService.successAlert();
      }, 500);
    });
  }

  close() {
    this.closeModal.next();
  }

  private closeDetails() {
    this.closeDetailsModal.next();
  }
}
