import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-favourite-modal',
  templateUrl: './favourite-modal.component.html',
  styleUrls: ['./favourite-modal.component.css'],
})
export class FavouriteModalComponent implements OnInit {
  @Output() closeFavourite = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeFavouriteModal() {
    this.closeFavourite.emit(true);
  }
}
