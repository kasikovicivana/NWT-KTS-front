import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientRoutes } from './client.routes';
import { PurchaseTokensComponent } from './pages/purchase-tokens/purchase-tokens.component';
import { SuccessfulPaymentComponent } from './pages/confirm-token-payment/successful-payment.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
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
import { StarRatingModule } from 'angular-star-rating';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { StepperModalComponent } from './components/stepper-modal/stepper-modal.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';
import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CollapseListComponent } from '../shared/components/collapse-list/collapse-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClientDriveHistoryComponent } from './pages/client-drive-history/client-drive-history.component';

import { ClientDriveReportComponent } from './pages/client-drive-report/client-drive-report.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NotificationViewComponent } from './pages/notification-view/notification-view.component';
import { NotificationTableComponent } from './components/notification-table/notification-table.component';
import { ApproveDrivePaymentComponent } from './pages/approve-drive-payment/approve-drive-payment.component';
import { LeaveCurrentDriveComment } from './pages/leave-current-drive-comment/leave-current-drive-comment.component';
import { FavouriteModalComponent } from './components/favourite-modal/favourite-modal.component';

@NgModule({
  declarations: [
    PurchaseTokensComponent,
    SuccessfulPaymentComponent,
    ProfileViewComponent,
    HomepageComponent,
    LiveChatComponent,
    StepperModalComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    SideBarComponent,
    CollapseListComponent,
    ClientDriveHistoryComponent,
    ClientDriveReportComponent,
    NotificationViewComponent,
    NotificationTableComponent,
    ApproveDrivePaymentComponent,
    LeaveCurrentDriveComment,
    FavouriteModalComponent,
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
    SharedModule,
    StarRatingModule.forChild(),
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
  providers: [],
  exports: [LiveChatComponent, StepperModalComponent],
})
export class ClientModule {}
