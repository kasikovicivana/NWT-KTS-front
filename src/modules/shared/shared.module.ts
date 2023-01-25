import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { DriveHistoryTableComponent } from './components/drive-history-table/drive-history-table.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CommonModule } from '@angular/common';
import { DriveDetailsModalComponent } from './components/drive-details-modal/drive-details-modal.component';
import { ClientModule } from '../client/client.module';
import { MapComponent } from './components/map/map.component';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  declarations: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
  ],
  exports: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
  ],
  imports: [MdbRippleModule, CommonModule, StarRatingModule],
})
export class SharedModule {}
