import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarType } from '../../../app/model/carType.model';

@Component({
  selector: 'app-car-type-info',
  templateUrl: './car-type-info.component.html',
  styleUrls: ['./car-type-info.component.css'],
})
export class CarTypeInfoComponent {
  @Input()
  carTypes!: CarType[];

  @Output() closeEvent = new EventEmitter<void>();

  closeModal() {
    this.closeEvent.next();
  }
}
