import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
  active: string = 'car_1';

  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({});
  }

  ngOnInit(): void {}

  stepOneSubmit() {}

  selectCar(car: string) {
    this.active = car;
  }
}
