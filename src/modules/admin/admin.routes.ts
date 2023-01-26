import { Routes } from '@angular/router';
import { BlockUserComponent } from './pages/block-user/block-user.component';
import { AdminChatBoxComponent } from './pages/admin-chat-box/admin-chat-box.component';
import { AdminDriveHistoryComponent } from './pages/admin-drive-history/admin-drive-history.component';

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
];
