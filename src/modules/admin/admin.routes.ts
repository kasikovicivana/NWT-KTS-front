import { Routes } from '@angular/router';
import { BlockUserComponent } from './pages/block-user/block-user.component';
import { AdminChatBoxComponent } from './pages/admin-chat-box/admin-chat-box.component';

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
];
