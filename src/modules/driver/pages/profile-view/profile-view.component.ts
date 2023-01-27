import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../../shared/services/user-service/user.service';
import { Driver } from '../../../app/model/driver.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  constructor(
    private alerts: AlertsService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  driver!: Driver;
  imageUrl: string = '';
  srcData: SafeResourceUrl | undefined;

  ngOnInit(): void {
    this.userService.getDriverCarInfo().subscribe((data) => {
      this.driver = data;
      this.imageService.loadImage(this.driver.photo).subscribe((data) => {
        this.imageUrl = URL.createObjectURL(data);
        this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
      });
    });
  }
}
