import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { StepOneComponent } from '../steps/step-one/step-one.component';
import { StepTwoComponent } from '../steps/step-two/step-two.component';

@Component({
  selector: 'app-stepper-modal',
  templateUrl: './stepper-modal.component.html',
  styleUrls: ['./stepper-modal.component.css'],
})
export class StepperModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() finishOrder = new EventEmitter<any>();

  @Input() distance: number = 0;

  stepOne: StepOneComponent | undefined;
  stepTwo: StepTwoComponent | undefined;

  constructor() {}

  @ViewChild(StepOneComponent) set one(one: StepOneComponent) {
    if (one) {
      this.stepOne = one;
    }
  }

  @ViewChild(StepTwoComponent) set two(two: StepTwoComponent) {
    if (two) {
      this.stepTwo = two;
    }
  }

  closeStepperModal() {
    this.closeModal.emit(false);
  }

  finish(alone: boolean) {
    this.sendDriveData(alone, false);
  }

  reserve(alone: boolean) {
    this.sendDriveData(alone, true);
  }

  sendDriveData(alone: boolean, reserve: boolean) {
    let { car, pet, babies, price } = this.stepOne?.getData();
    let passengers: string[] | undefined = this.stepTwo?.getData();
    this.finishOrder.emit({
      alone,
      car,
      pet,
      babies,
      passengers,
      price,
      reserve,
    });
  }
}
