import { DriveHistoryTableComponent } from './components/drive-history-table/drive-history-table.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { DriveDetailsModalComponent } from './components/drive-details-modal/drive-details-modal.component';
import { MapComponent } from './components/map/map.component';
import { StarRatingModule } from 'angular-star-rating';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Interceptor } from './interceptors/interceptor.interceptor';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { RouterModule } from '@angular/router';
import { ClientRoutes } from '../client/client.routes';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ClientModule } from '../client/client.module';
import { GradeModalComponent } from './components/grade-modal/grade-modal.component';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ChangePasswordModalComponent,
    CarTypeInfoComponent,
    InputUserInfoComponent,
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
    GradeModalComponent,
  ],

  imports: [
    RouterModule.forChild(ClientRoutes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    OverlayModule,
    NgStepperModule,
    CdkStepperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCheckboxModule,
    MdbRadioModule,
    MdbRippleModule,
    StarRatingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  exports: [
    DriveHistoryTableComponent,
    DriveDetailsModalComponent,
    MapComponent,
    ProfileInfoComponent,
    InputUserInfoComponent,
    CarTypeInfoComponent,
    GradeModalComponent,
  ],
})
export class SharedModule {}
