import { Routes } from '@angular/router';
import { DriverDriveHistoryComponent } from './pages/driver-drive-history/driver-drive-history.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';

export const DriverRoutes: Routes = [
  {
    path: 'driverHistory',
    pathMatch: 'full',
    component: DriverDriveHistoryComponent,
  },
  {
    path: 'driverProfile',
    pathMatch: 'full',
    component: ProfileViewComponent,
  },
];
