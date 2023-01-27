import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDriverChangesService } from '../../services/review-driver-changes-service/review-driver-changes.service';
import { DriverCarInfo } from '../../../app/model/driver.model';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detailed-driver-changes',
  templateUrl: './detailed-driver-changes.component.html',
  styleUrls: ['./detailed-driver-changes.component.css'],
})
export class DetailedDriverChangesComponent implements OnInit {
  private id: number = -1;
  info!: DriverCarInfo;
  srcData: SafeResourceUrl | undefined;
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private reviewDriverChangesService: ReviewDriverChangesService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reviewDriverChangesService.getDriverChangesById(this.id).subscribe({
      next: (data) => {
        this.info = data;
        this.imageService.loadImage(this.info.photo).subscribe((data) => {
          this.imageUrl = URL.createObjectURL(data);
          this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        });
      },
    });
  }

  approve(info: DriverCarInfo) {
    console.log(info);
    this.reviewDriverChangesService.accept(info).subscribe();
  }

  reject(info: DriverCarInfo) {
    this.reviewDriverChangesService.reject(info).subscribe();
  }
}
