import { Component, OnInit } from '@angular/core';
import { ClickEvent } from 'angular-star-rating';
import { GradeService } from '../../services/grade-service/grade.service';
import { GradeModel } from '../../../app/model/grade.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-grade-modal',
  templateUrl: './grade-modal.component.html',
  styleUrls: ['./grade-modal.component.css'],
})
export class GradeModalComponent implements OnInit {
  driverGrade: number = -1;
  driveGrade: number = -1;
  comment: string = '';
  grade!: GradeModel;

  constructor(
    private gradeService: GradeService,
    private alertService: AlertsService
  ) {}

  ngOnInit(): void {
    this.gradeService.getGrade().subscribe({
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
      this.alertService.successAlert();
    });
  }

  private close() {
    //close iz parenta
  }
}
