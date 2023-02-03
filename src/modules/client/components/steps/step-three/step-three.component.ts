import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertsService } from '../../../../shared/services/alerts-service/alerts.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent implements OnInit {
  public stepThreeForm: FormGroup;
  public aloneCheck = true;
  isReservation = false;
  reservationTime = '';
  public isFavourite = false;

  @Output() finish = new EventEmitter();
  @Output() reserve = new EventEmitter();
  @Input() passengers: Array<string> = [];

  @Input() price = 0;

  constructor(private fb: FormBuilder, private alert: AlertsService) {
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
    const splitPrice = this.price / (this.passengers.length + 1);
    return Math.round(splitPrice * 100) / 100;
  }

  finishRideChoice() {
    this.alert.successAlert(); // ...
    this.finish.emit(this.aloneCheck);
  }

  reservation() {
    this.isReservation = true;
  }

  reserveRide() {
    this.alert.successAlert(); // ...
    this.reserve.emit();
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

  isReservationDisabled() {
    if (this.reservationTime == '') {
      return true;
    }
    const now = new Date();
    const resTime = this.getReservationDatetime(this.reservationTime);
    const diff = resTime.valueOf() - now.valueOf();

    if (diff == 0) {
      return true;
    }
    const hoursDiff: number = diff / 1000 / 3600;
    return hoursDiff > 5 || hoursDiff < 0.25;
  }
}
