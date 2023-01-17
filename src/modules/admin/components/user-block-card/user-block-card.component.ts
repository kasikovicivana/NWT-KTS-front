import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Driver } from '../../../app/model/driver.model';
import { Client } from '../../../app/model/client.model';

@Component({
  selector: 'app-user-block-card',
  templateUrl: './user-block-card.component.html',
  styleUrls: ['./user-block-card.component.css'],
})
export class UserBlockCardComponent {
  @Input()
  user!: Client | Driver;

  @Output() someEvent = new EventEmitter<Client | Driver>();
  @Output() blockEvent = new EventEmitter<Client | Driver>();

  @ViewChild('blockButton') blockButton: ElementRef | undefined;

  constructor() {
    /* TODO document why this constructor is empty */
  }

  viewNotes(): void {
    this.someEvent.next(this.user);
  }

  blockUser(): void {
    this.blockEvent.next(this.user);
    if (this.blockButton?.nativeElement.innerText === 'BLOCK') {
      this.blockButton.nativeElement.innerText = 'UNBLOCK';
    } else {
      if (this.blockButton != undefined)
        this.blockButton.nativeElement.innerText = 'BLOCK';
    }
  }
}