import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../../shared/services/user-service/user.service';
import { User } from '../../../app/model/user.model';

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

  admin: User = new User();
  srcData: SafeResourceUrl | undefined;
  imageUrl: string = '';

  ngOnInit(): void {
    this.userService.getLoggedAdmin().subscribe((data) => {
      this.admin = data;
      this.admin.role = 'Admin';
      if (!this.admin.isSocialLogin) {
        this.imageService.loadImage('unknown.jpg').subscribe((data) => {
          this.imageUrl = URL.createObjectURL(data);
          this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        });
      }
    });
  }
}
