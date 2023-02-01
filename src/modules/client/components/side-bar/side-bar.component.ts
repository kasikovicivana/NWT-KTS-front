import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RouteDetails } from '../../../app/model/routeDetails';
import { CollapseListComponent } from '../../../shared/components/collapse-list/collapse-list.component';
import { Drive } from '../../../app/model/drive.model';
import { DriveService } from '../../../shared/services/drive-service/drive.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() openModal = new EventEmitter<boolean>();
  @Output() showFavourites = new EventEmitter<Drive[]>();
  @Output() showPositions = new EventEmitter<string[]>();
  @Output() changeRouteType = new EventEmitter<any>();

  isMyChoice: boolean = false;
  isLoggedIn: boolean = false;
  pins: string[] = [];
  start: string = '';
  end: string = '';
  routes: RouteDetails[][] = [];
  list: CollapseListComponent | undefined;

  favourites: Drive[] = [];

  constructor(private driveService: DriveService) {}

  @ViewChild(CollapseListComponent) set content(
    content: CollapseListComponent
  ) {
    if (content) {
      this.list = content;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem('username') != null;
    this.driveService.getFavouriteDrives().subscribe({
      next: (value) => {
        this.favourites = value;
      },
    });
  }

  addPin() {
    this.pins.push('');
  }

  trackByFn(index: number, item: string) {
    return index;
  }

  removePin(i: number) {
    this.pins.splice(i, 1);
  }

  openStepperModal() {
    // ...
    this.openModal.emit(true);
  }

  findPositions() {
    let positions = this.getPositions();
    this.showPositions.emit(positions);
  }

  showRouteOptions(routes: RouteDetails[][]) {
    this.routes = routes;
    let positions = this.getPositions();
    if (this.isMyChoice) {
      this.list?.showRouteOptions(this.routes, positions);
    }
  }

  myChoice() {
    this.isMyChoice = true;
    let positions = this.getPositions();
    this.list?.showRouteOptions(this.routes, positions);
  }

  changeRoute(params: any) {
    this.changeRouteType.emit(params);
  }

  isFindDisabled() {
    if (this.start === '' || this.end === '') {
      return true;
    }
    for (let p of this.pins) {
      if (p === '') {
        return true;
      }
    }
    return false;
  }

  isChooseDisabled() {
    return this.routes.length === 0;
  }

  chooseFavourite() {
    this.showFavourites.emit(this.favourites);
  }

  private getPositions() {
    let positions: string[] = [];
    positions.push(this.start);
    for (let pin of this.pins) {
      positions.push(pin);
    }
    positions.push(this.end);
    return positions;
  }
}
