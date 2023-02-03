import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { StepOneComponent } from '../steps/step-one/step-one.component';
import { StepTwoComponent } from '../steps/step-two/step-two.component';
import { StepThreeComponent } from '../steps/step-three/step-three.component';
import { ScheduleInfo } from '../../../app/model/schedule-info';

@Component({
  selector: 'app-stepper-modal',
  templateUrl: './stepper-modal.component.html',
  styleUrls: ['./stepper-modal.component.css'],
})
export class StepperModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() finishOrder = new EventEmitter<ScheduleInfo>();

  @Input() distance = 0;

  stepOne: StepOneComponent | undefined;
  stepTwo: StepTwoComponent | undefined;
  stepThree: StepThreeComponent | undefined;

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

  @ViewChild(StepThreeComponent) set three(three: StepThreeComponent) {
    if (three) {
      this.stepThree = three;
    }
  }

  closeStepperModal() {
    this.closeModal.emit(false);
  }

  finish() {
    const { car, pet, babies, price } = this.stepOne?.getData();
    let passengers: string[] | undefined;
    passengers = this.stepTwo?.passengers;

    const info: ScheduleInfo = new ScheduleInfo({
      passengers,
      car,
      babies,
      pet,
      price,
      distance: this.distance,
      duration: 0,
      splitFaire: this.stepThree?.aloneCheck,
      reservation: false,
      routes: [],
      reservationTime: undefined,
      favourite: this.stepThree?.isFavourite,
    });

    this.finishOrder.emit(info);
  }

  reserve() {
    const { car, pet, babies, price } = this.stepOne?.getData();
    const passengers: string[] | undefined = this.stepTwo?.getData();
    let time = undefined;
    if (this.stepThree?.reservationTime !== undefined) {
      time = this.getReservationDatetime(this.stepThree?.reservationTime);
    }

    const info: ScheduleInfo = new ScheduleInfo({
      passengers,
      car,
      babies,
      pet,
      price,
      distance: this.distance,
      duration: 0,
      splitFaire: this.stepThree?.aloneCheck,
      reservation: true,
      routes: [],
      reservationTime: time,
      favourite: this.stepThree?.isFavourite,
    });

    this.finishOrder.emit(info);
  }

  getReservationDatetime(time: string) {
    const now = new Date();
    const resTime: Date = new Date();
    resTime.setHours(Number(time.split(':')[0]));
    resTime.setMinutes(Number(time.split(':')[1]));

    if (resTime.valueOf() < now.valueOf()) {
      resTime.setDate(resTime.getDate() + 1);
    }
    return resTime;
  }
}
