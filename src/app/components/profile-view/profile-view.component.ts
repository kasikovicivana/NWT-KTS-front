import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProfileViewService} from "../../service/profile-view.service";
import {Client} from "../../model/client.model";
import {Image} from "../../model/image.model";
import {AlertsService} from "../../service/alerts.service";
import {ImageService} from "../../service/image.service";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  client: Client = new Client();
  showModal: boolean = false;
  isReadonly: boolean = true;
  imageUrl: string = "";
  srcData : SafeResourceUrl | undefined;


  @ViewChild('editButton') editButton: ElementRef | undefined;
  @ViewChild('changePhotoButton') changePhotoButton: ElementRef | undefined;
  @ViewChild('oldPassInput') oldPassInput: ElementRef | undefined;
  @ViewChild('newPassInput') newPassInput: ElementRef | undefined;
  @ViewChild('reenterNewPassInput') reenterNewPassInput: ElementRef | undefined;

  constructor(private profileViewService: ProfileViewService,private alerts: AlertsService,private imageService: ImageService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.profileViewService.getLoggedUserInfo().subscribe(
      (data) => {
        this.client = data
          this.imageService.loadImage(this.client.photo).subscribe((data) => {
            this.imageUrl = URL.createObjectURL(data);
            this.srcData = this.sanitizer.bypassSecurityTrustUrl(this.imageUrl);
          })
      }
    );
  }

  edit(): void {
    if(this.editButton != undefined){
      if (this.editButton.nativeElement.innerHTML==="Save" ) {
        this.profileViewService.saveClient(this.client).subscribe();
        this.alerts.successAlert();
      }

      if (this.editButton.nativeElement.innerHTML==="Edit" ) {
        this.editButton.nativeElement.innerHTML="Save" ;
      }
      else {
        this.editButton.nativeElement.innerHTML="Edit" ;
      }
      this.isReadonly = !this.isReadonly;

    }

  }

  changeProfilePhoto():void {
    this.changePhotoButton?.nativeElement.click();
  }

  addAttachment(fileInput: any) {
    const fileReaded = fileInput.target.files[0];
    let picturePath  = new FileReader();
    picturePath.readAsDataURL(fileReaded)
    let that = this;
    picturePath.onload = e => {
        if (e.target != null){
        let i = new Image()
        i.path = fileReaded.name
        i.data = e.target.result as string
          that.imageService.addImage(i).subscribe()
          that.client.photo = i.path
          that.profileViewService.saveClient(that.client).subscribe()
          location.reload()
      }
    }
  }

  changePassword() {
    let isCorrectPass = undefined;
    let context = this;
    let newPass = this.newPassInput?.nativeElement.value
    this.profileViewService.isOldPasswordCorrect(this.oldPassInput?.nativeElement.value).subscribe((data) => {
      isCorrectPass = data;
      if (isCorrectPass === false) {
        context.alerts.errorAlertCustomMessage("Old password is not correct.");
        return
      }
      context.profileViewService.changePassword(newPass).subscribe();
      context.alerts.successAlert();
    })
    this.showModal = false
  }



}
