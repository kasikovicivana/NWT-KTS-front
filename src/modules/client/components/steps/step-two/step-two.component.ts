import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../shared/services/user-service/user.service';
import { AlertsService } from '../../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
})
export class StepTwoComponent {
  public stepTwoForm: FormGroup;
  public passengers: Array<string> = [];
  public p: string = '';
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+)*@[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?(\.[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?)*$/;
  passengerInput: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertsService
  ) {
    this.stepTwoForm = this.fb.group({});
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  isNextDisabled() {
    if (this.passengers.length > 1) {
      for (let p of this.passengers) {
        if (p == '' || !this.emailPattern.test(p)) {
          return true;
        }
      }
    } else {
      if (
        this.passengers[0] != '' &&
        !this.emailPattern.test(this.passengers[0])
      ) {
        return true;
      }
    }
    return false;
  }

  addUser() {
    if (sessionStorage.getItem('username') === this.passengerInput) {
      this.alertService.errorAlert("You can't add yourself. Idiot.");
      return;
    }
    if (this.passengerInput !== '') {
      this.userService.getClientByMail(this.passengerInput).subscribe({
        next: () => {
          this.passengers.push(this.passengerInput);
        },
        error: (err) => {
          this.alertService.errorAlert('User not found');
        },
      });
    }
  }

  removeUser(i: number) {
    this.passengers.splice(i, 1);
  }

  getData(): string[] {
    return this.passengers;
  }
}
