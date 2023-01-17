import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientRoutes } from './client.routes';
import { PurchaseTokensComponent } from './pages/purchase-tokens/purchase-tokens.component';
import { SuccessfulPaymentComponent } from './pages/confirm-payment/successful-payment.component';
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
import { GradeModalComponent } from './components/grade-modal/grade-modal.component';
import { LiveChatComponent } from './components/live-chat/live-chat.component';
import { StepperModalComponent } from './components/stepper-modal/stepper-modal.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';
import { StepThreeComponent } from './components/steps/step-three/step-three.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MapComponent } from '../shared/components/map/map.component';
import { CollapseListComponent } from '../shared/components/collapse-list/collapse-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PurchaseTokensComponent,
    SuccessfulPaymentComponent,
    ProfileViewComponent,
    HomepageComponent,
    GradeModalComponent,
    LiveChatComponent,
    StepperModalComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    SideBarComponent,
    MapComponent,
    CollapseListComponent,
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
  ],
  providers: [],
})
export class ClientModule {}
