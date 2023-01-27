import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Image } from '../../../app/model/image.model';
import { AlertsService } from '../../services/alerts-service/alerts.service';
import { ImageService } from '../../services/image-service/image.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../../app/model/user.model';
import { CarType } from '../../../app/model/carType.model';
import { CarService } from '../../services/car-service/car.service';
import { DomUtil } from 'leaflet';
import getClass = DomUtil.getClass;
import { DriverCarInfo } from '../../../app/model/driver.model';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('editButton') editButton: ElementRef | undefined;
  @ViewChild('requestApprovalButton') requestApprovalButton:
    | ElementRef
    | undefined;
  @ViewChild('changePhotoButton') changePhotoButton: ElementRef | undefined;

  @Input() info!: User | DriverCarInfo;
  @Input() srcData: SafeResourceUrl | undefined;
  @Input() approveChanges: boolean = false;
  @Output() approveChangesEvent = new EventEmitter<DriverCarInfo>();
  @Output() rejectChangesEvent = new EventEmitter<DriverCarInfo>();

  carTypes: [CarType] | undefined;
  private imageUrl: string = '';
  showModal: boolean = false;
  isReadonly: boolean = true;
  isDataValid: boolean = false;
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  phoneNumberPattern = /^(\+)?\d{8}\d+$/;

  type: string = 'Van XL';
  babiesAllowed: boolean = false;
  petFriendly: boolean = false;
  viewCarTypeInfo: boolean = false;

  constructor(
    private alerts: AlertsService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log('uh');
      this.carService.getCarTypes().subscribe({
        next: (data) => {
          this.carTypes = data;
        },
      });
      if ('babiesAllowed' in this.info) {
        this.babiesAllowed = this.info.babiesAllowed;
        this.petFriendly = this.info.petFriendly;
        this.type = this.info.type;
      }
    }, 1000);
  }

  validateData() {
    this.isDataValid =
      this.info.name != '' &&
      this.info.surname != '' &&
      this.info.email != '' &&
      this.info.phoneNumber != '' &&
      this.info.city != '' &&
      this.info.role != '' &&
      this.emailPattern.test(this.info.email) &&
      this.phoneNumberPattern.test(this.info.phoneNumber);
  }

  // viewModal(): void {
  //   this.showModal = true;
  //   this.newPass = '';
  //   this.reenteredPass = '';
  // }

  edit(): void {
    if (this.editButton != undefined) {
      if (this.editButton.nativeElement.innerHTML === 'Save') {
        this.validateData();
        if (this.isDataValid) {
          if (!('babiesAllowed' in this.info))
            this.userService.saveUser(this.info).subscribe();
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
        that.imageService.addImage(i).subscribe({
          next: (data) => {
            this.imageUrl = URL.createObjectURL(data);
            this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
          },
        });
        that.info.photo = i.path;
        console.log('cuva');
        if (!('babiesAllowed' in this.info))
          that.userService.saveUser(<User>that.info).subscribe();
      }
    };
  }

  closeModal() {
    this.showModal = false;
  }

  changeBabiesAllowed() {
    this.babiesAllowed = !this.babiesAllowed;
  }

  changepetFriendly() {
    this.petFriendly = !this.petFriendly;
  }

  modalView() {
    this.viewCarTypeInfo = true;
  }

  requestApproval() {
    if (this.requestApprovalButton != undefined) {
      if (
        this.requestApprovalButton.nativeElement.innerHTML ===
        'Request approval'
      ) {
        this.processRequestEdition();
      }
      if (this.requestApprovalButton.nativeElement.innerHTML === 'Edit') {
        this.requestApprovalButton.nativeElement.innerHTML = 'Request approval';
        this.isReadonly = false;
      } else {
        this.requestApprovalButton.nativeElement.innerHTML = 'Edit';
        this.isReadonly = true;
      }
    }
  }

  private processRequestEdition() {
    this.validateData();
    if (this.isDataValid) {
      if ('babiesAllowed' in this.info) {
        this.info.type = this.type;
        this.info.babiesAllowed = this.babiesAllowed;
        this.info.petFriendly = this.petFriendly;
        this.userService.saveEditDriver(this.info).subscribe();
        this.alerts.successEditRequestAlert();
      }
    } else {
      this.alerts.errorAlert('You must fill all fields!');
    }
  }

  approve() {
    console.log('kao apprvoe');
    if ('babiesAllowed' in this.info) this.approveChangesEvent.next(this.info);
    this.alerts.successAlert();
    window.location.href = '/reviewDriverChanges';
  }

  reject() {
    if ('babiesAllowed' in this.info) this.rejectChangesEvent.next(this.info);
    this.alerts.successAlert();
    window.location.href = '/reviewDriverChanges';
  }
}
