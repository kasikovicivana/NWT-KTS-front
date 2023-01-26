import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../../services/image-service/image.service';
import { UserService } from '../../services/user-service/user.service';
import { GradeService } from '../../../client/services/grade-service/grade.service';
import { GradeModel } from '../../../app/model/grade.model';

@Component({
  selector: 'app-drive-details-modal',
  templateUrl: './drive-details-modal.component.html',
  styleUrls: ['./drive-details-modal.component.css'],
})
export class DriveDetailsModalComponent implements OnInit {
  @Input() drive: Drive = new Drive();
  @Output() closeModal = new EventEmitter<boolean>();
  srcData: SafeResourceUrl | undefined;
  driverGrade: number = 0;
  carGrade: number = 0;
  grades: GradeModel[] = [];
  rateDrive: boolean = true;
  role: string | null = sessionStorage.getItem('role');

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    console.log(this.drive);
    this.getGradesForDrive();
    this.imageService.loadImage(this.drive.driver.photo).subscribe((data) => {
      let imageUrl = URL.createObjectURL(data);
      this.srcData = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });
  }

  closeDetailsModal() {
    this.closeModal.emit(false);
  }

  getGradesForDrive() {
    this.gradeService.getAllDriveGrades(this.drive.id).subscribe((data) => {
      console.log(data);
      this.grades = data;
      let driverGrade = 0;
      let carGrade = 0;
      for (let grade of data) {
        driverGrade += grade.driverGrade;
        carGrade += grade.carGrade;
        this.checkIfRated(grade);
      }
      this.driverGrade = driverGrade / data.length;
      this.carGrade = carGrade / data.length;
    });
  }

  checkIfRated(grade: GradeModel) {
    let email = sessionStorage.getItem('username');
    if (grade.clientEmail === email) {
      this.rateDrive = false;
    }
  }
}
