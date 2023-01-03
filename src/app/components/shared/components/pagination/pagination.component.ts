import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number | undefined;
  @Input() pageSize: number | undefined;
  @Input() set activePage(value: number) {
    if (value !== this._activePage) {
      this._activePage = value;
      this.initPages();
    }
  }
  _activePage: number;
  @Output() pageSelected: EventEmitter<number>;
  pages: number[];

  constructor(private utilService: UtilService) {
    this.pageSelected = new EventEmitter();
    this._activePage = 1;
    this.pages = [];
  }

  ngOnInit() {
    this.initPages();
  }

  initPages() {
    this.pages = [];
    for (
      let i = 0;
      i < this.utilService.getNoPages(this.totalItems, this.pageSize);
      i++
    ) {
      this.pages.push(i + 1);
    }
    console.log(this.pages);
  }

  ngOnChanges(changes: { totalItems: { currentValue: number | undefined } }) {
    console.log('changes total je');
    console.log(changes);
    if (changes.totalItems?.currentValue) {
      this.totalItems = changes.totalItems?.currentValue;
      this.pages = [];
      for (
        let i = 1;
        i <= this.utilService.getNoPages(this.totalItems, this.pageSize);
        i++
      ) {
        this.pages.push(i);
      }
    }
  }

  selected(newPage: number) {
    if (
      newPage >= 1 &&
      newPage <= this.utilService.getNoPages(this.totalItems, this.pageSize)
    ) {
      this._activePage = newPage;
      this.pageSelected.emit(this._activePage);
    }
  }
}
