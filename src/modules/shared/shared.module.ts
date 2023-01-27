import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { DriveHistoryTableComponent } from './components/drive-history-table/drive-history-table.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CommonModule } from '@angular/common';
import { DriveDetailsModalComponent } from './components/drive-details-modal/drive-details-modal.component';
import { MapComponent } from './components/map/map.component';
import { StarRatingModule } from 'angular-star-rating';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { DriveChartComponent } from './components/drive-chart/drive-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  declarations: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
    DriveChartComponent,
  ],
  exports: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
    DriveChartComponent,
  ],
  imports: [
    MdbRippleModule,
    CommonModule,
    StarRatingModule,
    MdbFormsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
})
export class SharedModule {}
