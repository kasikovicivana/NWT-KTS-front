import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-modal',
  templateUrl: './stepper-modal.component.html',
  styleUrls: ['./stepper-modal.component.css'],
})
export class StepperModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  closeStepperModal() {
    this.closeModal.emit(false);
  }
}
