import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileViewService } from '../../service/profile-view.service';
import { Client } from '../../model/client.model';
import { Image } from '../../model/image.model';
import { AlertsService } from '../../service/alerts.service';
import { ImageService } from '../../service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent implements OnInit {
  client: Client = new Client();
  showModal: boolean = false;
  isReadonly: boolean = true;
  imageUrl: string = '';
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  phoneNumberPattern = /^(\+)?\d{8}\d+$/;
  srcData: SafeResourceUrl | undefined;
  isDataValid: boolean = false;
  newPass: string = '';
  reenteredPass: string = '';

  @ViewChild('editButton') editButton: ElementRef | undefined;
  @ViewChild('changePhotoButton') changePhotoButton: ElementRef | undefined;
  @ViewChild('oldPassInput') oldPassInput: ElementRef | undefined;

  constructor(
    private profileViewService: ProfileViewService,
    private alerts: AlertsService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profileViewService.getLoggedClient().subscribe((data) => {
      this.client = data;
      if (!this.client.isSocialLogin) {
        this.imageService.loadImage(this.client.photo).subscribe((data) => {
          this.imageUrl = URL.createObjectURL(data);
          this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
        });
      }
    });
  }
  validateData() {
    this.isDataValid =
      this.client.name != '' &&
      this.client.surname != '' &&
      this.client.email != '' &&
      this.client.phoneNumber != '' &&
      this.client.city != '' &&
      this.client.role != '' &&
      this.emailPattern.test(this.client.email) &&
      this.phoneNumberPattern.test(this.client.phoneNumber);
    if (this.client.role === 'Client') {
      this.isDataValid = this.isDataValid && this.client.tokens != 0.0;
    }
  }

  viewModal(): void {
    this.showModal = true;
    this.newPass = '';
    this.reenteredPass = '';
  }

  edit(): void {
    if (this.editButton != undefined) {
      if (this.editButton.nativeElement.innerHTML === 'Save') {
        this.validateData();
        if (this.isDataValid) {
          this.userService.saveClient(this.client).subscribe();
          this.alerts.successAlert();
        } else {
          this.alerts.errorAlert('You must fill all fields!');
        }
      }

      if (this.editButton.nativeElement.innerHTML === 'Edit') {
        this.editButton.nativeElement.innerHTML = 'Save';
        this.isReadonly = false;
      } else {
        this.editButton.nativeElement.innerHTML = 'Edit';
        this.isReadonly = true;
      }
    }
  }

  changeProfilePhoto(): void {
    this.changePhotoButton?.nativeElement.click();
  }

  addAttachment(fileInput: any) {
    const fileRead = fileInput.target.files[0];
    let picturePath = new FileReader();
    picturePath.readAsDataURL(fileRead);
    let that = this;
    picturePath.onload = (e) => {
      if (e.target != null) {
        let i = new Image();
        i.path = fileRead.name;
        i.data = e.target.result as string;
        that.imageService.addImage(i).subscribe();
        that.client.photo = i.path;
        that.userService.saveClient(that.client).subscribe();
        location.reload();
      }
    };
  }

  changePassword() {
    let isCorrectPass = undefined;
    let context = this;
    this.profileViewService
      .isOldPasswordCorrect(this.oldPassInput?.nativeElement.value)
      .subscribe((data) => {
        isCorrectPass = data;
        if (isCorrectPass === false) {
          context.alerts.errorAlertCustomMessage(
            'Old password is not correct.'
          );
          return;
        }
        context.profileViewService.changePassword(context.newPass).subscribe();
        context.alerts.successAlert();
      });
    this.showModal = false;
  }
}
