import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { DriverRoutes } from './driver.routes';
import { RouterModule } from '@angular/router';
import { DriverDriveReportComponent } from './pages/driver-drive-report/driver-drive-report.component';
import { ViewFutureDrivesComponent } from './pages/view-future-drives/view-future-drives.component';
import { EnterRejectReasonComponent } from './components/enter-reject-reason/enter-reject-reason.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { CurrentDrivesTableComponent } from './components/current-drives-table/current-drives-table.component';

@NgModule({
  declarations: [
    DriverDriveHistoryComponent,
    ProfileViewComponent,
    ViewFutureDrivesComponent,
    EnterRejectReasonComponent,
    DriverDriveReportComponent,
    CurrentDrivesTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DriverRoutes),
    MdbFormsModule,
    FormsModule,
    MdbValidationModule,
  ],
  providers: [],
})
export class DriverModule {}
