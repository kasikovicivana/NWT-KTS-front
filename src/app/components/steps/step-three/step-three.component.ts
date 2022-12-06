import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent implements OnInit {
  public stepThreeForm: FormGroup;
  public price: number = 500;
  public aloneCheck: boolean = true;

  @Input() passengers: Array<string> = [];

  constructor(private fb: FormBuilder) {
    this.stepThreeForm = this.fb.group({});
  }

  ngOnInit(): void {
    console.log(this.passengers);
  }

  changeToSplit() {
    this.aloneCheck = false;
  }

  changeToAlone() {
    this.aloneCheck = true;
  }

  sumPrice() {
    let splitPrice = this.price / (this.passengers.length + 1);
    return Math.round(splitPrice * 100) / 100;
  }
}
