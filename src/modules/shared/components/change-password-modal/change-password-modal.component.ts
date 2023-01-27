import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AlertsService } from '../../services/alerts-service/alerts.service';
import { ImageService } from '../../services/image-service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css'],
})
export class ChangePasswordModalComponent implements OnInit {
  @ViewChild('oldPassInput') oldPassInput: ElementRef | undefined;

  @Output() closeEvent = new EventEmitter<boolean>();

  constructor(
    private alerts: AlertsService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  newPass: string = '';
  reenteredPass: string = '';

  ngOnInit(): void {}

  close() {
    this.closeEvent.next(false);
  }

  changePassword() {
    let isCorrectPass = undefined;
    let context = this;
    this.userService
      .isOldPasswordCorrect(this.oldPassInput?.nativeElement.value)
      .subscribe((data) => {
        isCorrectPass = data;
        if (isCorrectPass === false) {
          context.alerts.errorAlertCustomMessage(
            'Old password is not correct.'
          );
          return;
        }
        context.userService.changePassword(context.newPass).subscribe();
        context.alerts.successAlert();
      });
    this.closeEvent.next(false);
  }
}
