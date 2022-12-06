import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm: FormGroup;
  public passengers: Array<string> = [''];
  public p: string = '';
  emailPattern =
    /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/\d=?A-Z^_`a-z{|}~]+)*@[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?(\.[A-Za-z\d]([A-Za-z\d-]{0,61}[A-Za-z\d])?)*$/;

  constructor(private fb: FormBuilder) {
    this.stepTwoForm = this.fb.group({});
  }

  ngOnInit(): void {}

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
    this.passengers.push('');
  }

  removeUser(i: number) {
    this.passengers.splice(i, 1);
  }
}
