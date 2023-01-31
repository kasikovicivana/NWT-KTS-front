import { Routes } from '@angular/router';
import { BlockUserComponent } from './pages/block-user/block-user.component';
import { AdminChatBoxComponent } from './pages/admin-chat-box/admin-chat-box.component';
import { AdminDriveHistoryComponent } from './pages/admin-drive-history/admin-drive-history.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { ReviewDriverChangesComponent } from './pages/review-driver-changes/review-driver-changes.component';
import { DetailedDriverChangesComponent } from './pages/detailed-driver-changes/detailed-driver-changes.component';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { AdminDriveReportComponent } from './pages/admin-drive-report/admin-drive-report.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const AdminRoutes: Routes = [
  {
    path: 'blockUsers',
    pathMatch: 'full',
    component: BlockUserComponent,
  },
  {
    path: 'messages',
    pathMatch: 'full',
    component: AdminChatBoxComponent,
  },
  {
    path: 'adminHistory',
    pathMatch: 'full',
    component: AdminDriveHistoryComponent,
  },
  {
    path: 'adminProfile',
    pathMatch: 'full',
    component: ProfileViewComponent,
  },
  {
    path: 'reviewDriverChanges',
    pathMatch: 'full',
    component: ReviewDriverChangesComponent,
  },
  {
    path: 'detailedDriverChanges/:id',
    pathMatch: 'full',
    component: DetailedDriverChangesComponent,
  },
  {
    path: 'addDriver',
    pathMatch: 'full',
    component: AddDriverComponent,
  },
  {
    path: 'adminReport',
    pathMatch: 'full',
    component: AdminDriveReportComponent,
  },
  {
    path: 'adminHomepage',
    pathMatch: 'full',
    component: HomepageComponent,
  },
];
