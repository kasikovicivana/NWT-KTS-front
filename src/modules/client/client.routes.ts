import { Routes } from '@angular/router';
import { PurchaseTokensComponent } from './pages/purchase-tokens/purchase-tokens.component';
import { SuccessfulPaymentComponent } from './pages/confirm-payment/successful-payment.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ClientDriveHistoryComponent } from './pages/client-drive-history/client-drive-history.component';
import { ClientDriveReportComponent } from './pages/client-drive-report/client-drive-report.component';

export const ClientRoutes: Routes = [
  {
    path: 'purchaseTokens',
    pathMatch: 'full',
    component: PurchaseTokensComponent,
  },

  {
    path: 'confirmPayment',
    pathMatch: 'full',
    component: SuccessfulPaymentComponent,
  },

  {
    path: 'clientProfile',
    pathMatch: 'full',
    component: ProfileViewComponent,
  },

  {
    path: 'home',
    pathMatch: 'full',
    component: HomepageComponent,
  },

  {
    path: 'clientHistory',
    pathMatch: 'full',
    component: ClientDriveHistoryComponent,
  },

  {
    path: 'clientReport',
    pathMatch: 'full',
    component: ClientDriveReportComponent,
  },
];
