import { DriveHistoryTableComponent } from './components/drive-history-table/drive-history-table.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { DriveDetailsModalComponent } from './components/drive-details-modal/drive-details-modal.component';
import { StarRatingModule } from 'angular-star-rating';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { RouterModule } from '@angular/router';
import { ClientRoutes } from '../client/client.routes';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { CarTypeInfoComponent } from './components/car-type-info/car-type-info.component';
import { InputUserInfoComponent } from './components/input-user-info/input-user-info.component';
import { GradeModalComponent } from './components/grade-modal/grade-modal.component';
import { DriveChartComponent } from './components/drive-chart/drive-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DriveReportComponent } from './components/drive-report/drive-report.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouteMapComponent } from './components/route-map/route-map.component';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ChangePasswordModalComponent,
    CarTypeInfoComponent,
    InputUserInfoComponent,
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    GradeModalComponent,
    DriveChartComponent,
    DriveReportComponent,
    RouteMapComponent,
  ],

  imports: [
    RouterModule.forChild(ClientRoutes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbValidationModule,
    OverlayModule,
    NgStepperModule,
    CdkStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCheckboxModule,
    MdbRadioModule,
    MdbRippleModule,
    StarRatingModule,
    MdbRippleModule,
    CommonModule,
    StarRatingModule,
    MdbFormsModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],

  exports: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    ProfileInfoComponent,
    InputUserInfoComponent,
    CarTypeInfoComponent,
    GradeModalComponent,
    DriveChartComponent,
    DriveReportComponent,
    RouteMapComponent,
  ],
})
export class SharedModule {}
