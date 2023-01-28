import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routes';
import { AdminChatBoxComponent } from './pages/admin-chat-box/admin-chat-box.component';
import { BlockUserComponent } from './pages/block-user/block-user.component';
import { HttpClientModule } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
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
import { SharedModule } from '../shared/shared.module';
import { AdminDriveHistoryComponent } from './pages/admin-drive-history/admin-drive-history.component';
import { AdminDriveReportComponent } from './pages/admin-drive-report/admin-drive-report.component';

@NgModule({
  declarations: [
    AdminChatBoxComponent,
    BlockUserComponent,
    NoteModalComponent,
    UserBlockCardComponent,
    PaginationComponent,
    AdminDriveHistoryComponent,
    AdminDriveReportComponent,
  ],
  imports: [
    RouterModule.forChild(AdminRoutes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MdbCheckboxModule,
    MdbRadioModule,
    SharedModule,
  ],
  providers: [],
})
export class AdminModule {}
