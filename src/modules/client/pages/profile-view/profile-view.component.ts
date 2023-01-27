import { Component, OnInit } from '@angular/core';
import { Client } from '../../../app/model/client.model';
import { AlertsService } from '../../../shared/services/alerts-service/alerts.service';
import { ImageService } from '../../../shared/services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../../shared/services/user-service/user.service';

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

  client: Client = new Client();
  imageUrl: string = '';
  srcData: SafeResourceUrl | undefined;

  ngOnInit(): void {
    this.userService.getLoggedClient().subscribe((data) => {
      this.client = data;
      if (!this.client.isSocialLogin) {
        this.imageService.loadImage(this.client.photo).subscribe((data) => {
          this.imageUrl = URL.createObjectURL(data);
          this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        });
      }
    });
  }
}
