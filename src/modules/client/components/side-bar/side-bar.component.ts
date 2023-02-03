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
import { RouteParams } from '../../../app/model/route-params';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() openModal = new EventEmitter<boolean>();
  @Output() showFavourites = new EventEmitter<Drive[]>();
  @Output() showPositions = new EventEmitter<string[]>();
  @Output() changeRouteType = new EventEmitter<RouteParams>();

  isMyChoice = false;
  isLoggedIn = false;
  pins: string[] = [];
  start = '';
  end = '';
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
    if (this.isLoggedIn) {
      this.driveService.getFavouriteDrives().subscribe({
        next: (value) => {
          this.favourites = value;
        },
      });
    }
  }

  addPin() {
    this.pins.push('');
  }

  trackByFn(index: number) {
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
    const positions = this.getPositions();
    this.showPositions.emit(positions);
  }

  showRouteOptions(routes: RouteDetails[][]) {
    this.routes = routes;
    const positions = this.getPositions();
    if (this.isMyChoice) {
      this.list?.showRouteOptions(this.routes, positions);
    }
  }

  myChoice() {
    this.isMyChoice = true;
    const positions = this.getPositions();
    this.list?.showRouteOptions(this.routes, positions);
  }

  changeRoute(params: RouteParams) {
    this.changeRouteType.emit(params);
  }

  isFindDisabled() {
    if (this.start === '' || this.end === '') {
      return true;
    }
    for (const p of this.pins) {
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

  displayFavourite(drive: Drive) {
    this.pins = [];
    this.start = drive.routes[0].start.address;
    this.end = drive.routes[drive.routes.length - 1].end.address;

    if (drive.routes.length > 1) {
      this.pins.push(drive.routes[0].end.address);
    }

    drive.routes.splice(0, 1);
    drive.routes.splice(drive.routes.length - 1, 1);

    for (const r of drive.routes) {
      this.pins.push(r.end.address);
    }

    this.driveService.getFavouriteDrives().subscribe({
      next: (value) => {
        this.favourites = value;
      },
    });
  }

  systemChoice() {
    this.isMyChoice = false;
    for (const r of this.routes) {
      const params: RouteParams = new RouteParams(
        this.routes.indexOf(r),
        'recommended'
      );
      this.changeRoute(params);
    }
  }

  private getPositions() {
    const positions: string[] = [];
    positions.push(this.start);
    for (const pin of this.pins) {
      positions.push(pin);
    }
    positions.push(this.end);
    return positions;
  }
}
