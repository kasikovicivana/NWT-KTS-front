import { Component, Input, OnInit } from '@angular/core';
import { Driver, DriverCarInfo } from '../../../app/model/driver.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { UserService } from '../../../shared/services/user-service/user.service';
import { ReviewDriverChangesService } from '../../services/review-driver-changes-service/review-driver-changes.service';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-driver-edit-card',
  templateUrl: './driver-edit-card.component.html',
  styleUrls: ['./driver-edit-card.component.css'],
})
export class DriverEditCardComponent implements OnInit {
  @Input()
  info!: DriverCarInfo;

  driver!: Driver;

  srcData: SafeResourceUrl | undefined;
  imageUrl: string = '';

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private reviewDriverChangesService: ReviewDriverChangesService,
    private alerts: AlertsService
  ) {}

  ngOnInit() {
    this.userService.getDriverById(this.info.driverId).subscribe({
      next: (data) => {
        this.driver = data;
        this.imageService.loadImage(this.driver.photo).subscribe((data) => {
          this.imageUrl = URL.createObjectURL(data);
          this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        });
      },
    });
  }

  approveChanges() {
    this.reviewDriverChangesService.accept(this.info).subscribe();
    this.alerts.successAlert();
    location.reload();
  }

  rejectChanges() {
    this.reviewDriverChangesService.reject(this.info).subscribe();
    this.alerts.successAlert();
    location.reload();
  }
}
