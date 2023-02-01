import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Drive } from '../../../app/model/drive.model';

@Component({
  selector: 'app-favourite-modal',
  templateUrl: './favourite-modal.component.html',
  styleUrls: ['./favourite-modal.component.css'],
})
export class FavouriteModalComponent implements OnInit {
  @Output() closeFavourite = new EventEmitter<Drive>();
  @Input() favourites: Drive[] = [];

  chosen: Drive | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    if (this.favourites.length > 0) {
      this.chosen = this.favourites[0];
    }
  }

  closeFavouriteModal() {
    this.closeFavourite.emit(undefined);
  }

  choose(drive: Drive) {
    this.chosen = drive;
    this.closeFavourite.emit(drive);
  }
}
