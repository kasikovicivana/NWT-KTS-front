import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Driver } from '../../../app/model/driver.model';
import { Client } from '../../../app/model/client.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ImageService } from '../../../shared/services/image-service/image.service';

@Component({
  selector: 'app-user-block-card',
  templateUrl: './user-block-card.component.html',
  styleUrls: ['./user-block-card.component.css'],
})
export class UserBlockCardComponent implements OnInit {
  @Input()
  user!: Client | Driver;

  srcData: SafeResourceUrl | undefined;
  imageUrl: string = '';

  @Output() someEvent = new EventEmitter<Client | Driver>();
  @Output() blockClient = new EventEmitter<Client>();
  @Output() blockDriver = new EventEmitter<Driver>();

  @ViewChild('blockButton') blockButton: ElementRef | undefined;

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {
    /* TODO document why this constructor is empty */
  }

  ngOnInit() {
    if (!this.user.isSocialLogin) {
      this.imageService.loadImage(this.user.photo).subscribe((data) => {
        this.imageUrl = URL.createObjectURL(data);
        this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
      });
    }
  }

  viewNotes(): void {
    this.someEvent.next(this.user);
  }

  blockUser(): void {
    if (this.user instanceof Driver) this.blockDriver.next(this.user);
    else this.blockClient.next(this.user);
    if (this.blockButton?.nativeElement.innerText === 'BLOCK') {
      this.blockButton.nativeElement.innerText = 'UNBLOCK';
    } else {
      if (this.blockButton != undefined)
        this.blockButton.nativeElement.innerText = 'BLOCK';
    }
  }
}
