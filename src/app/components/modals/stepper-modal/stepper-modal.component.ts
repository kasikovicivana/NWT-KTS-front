import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-modal',
  templateUrl: './stepper-modal.component.html',
  styleUrls: ['./stepper-modal.component.css'],
})
export class StepperModalComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  sendMessage() {
    this.messageEvent.emit('show');
  }
}
