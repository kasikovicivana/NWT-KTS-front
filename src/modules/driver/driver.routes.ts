import { Routes } from '@angular/router';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { DriverDriveReportComponent } from './pages/driver-drive-report/driver-drive-report.component';
import { ViewFutureDrivesComponent } from './pages/view-future-drives/view-future-drives.component';

export const DriverRoutes: Routes = [
  {
    path: 'driverHistory',
    pathMatch: 'full',
    component: DriverDriveHistoryComponent,
  },
  {
    path: 'futureDrives',
    pathMatch: 'full',
    component: ViewFutureDrivesComponent,
  },
  {
    path: 'driverProfile',
    pathMatch: 'full',
    component: ProfileViewComponent,
  },
  {
    path: 'driverReport',
    pathMatch: 'full',
    component: DriverDriveReportComponent,
  },
];
