import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-modal',
  templateUrl: './stepper-modal.component.html',
  styleUrls: ['./stepper-modal.component.css'],
})
export class StepperModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();

  constructor() {}

  closeStepperModal() {
    this.closeModal.emit(false);
  }
}
