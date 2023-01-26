import { Routes } from '@angular/router';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';

export const DriverRoutes: Routes = [
  {
    path: 'driverHistory',
    pathMatch: 'full',
    component: DriverDriveHistoryComponent,
  },
];
