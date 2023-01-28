import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { DriverRoutes } from './driver.routes';
import { RouterModule } from '@angular/router';
import { DriverDriveReportComponent } from './pages/driver-drive-report/driver-drive-report.component';

@NgModule({
  declarations: [DriverDriveHistoryComponent, ProfileViewComponent,DriverDriveReportComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(DriverRoutes)],
  providers: [],
})
export class DriverModule {}
