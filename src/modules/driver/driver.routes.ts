import { Routes } from '@angular/router';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';
import { DriverDriveReportComponent } from './pages/driver-drive-report/driver-drive-report.component';

export const DriverRoutes: Routes = [
  {
    path: 'driverHistory',
    pathMatch: 'full',
    component: DriverDriveHistoryComponent,
  },
  {
    path: 'driverReport',
    pathMatch: 'full',
    component: DriverDriveReportComponent,
  },
];
