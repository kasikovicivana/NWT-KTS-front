import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { AdminChatBoxComponent } from './pages/admin-chat-box/admin-chat-box.component';
import { BlockUserComponent } from './pages/block-user/block-user.component';
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
import { NoteModalComponent } from './components/note-modal/note-modal.component';
import { UserBlockCardComponent } from './components/user-block-card/user-block-card.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AdminChatBoxComponent,
    BlockUserComponent,
    NoteModalComponent,
    UserBlockCardComponent,
    PaginationComponent,
  ],
  imports: [
    RouterModule.forChild(AdminRoutes),
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
  ],
  providers: [],
})
export class AdminModule {}
