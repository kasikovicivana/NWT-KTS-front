import { Routes } from '@angular/router';
import { PurchaseTokensComponent } from './pages/purchase-tokens/purchase-tokens.component';
import { SuccessfulPaymentComponent } from './pages/confirm-payment/successful-payment.component';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

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
    path: 'profile',
    pathMatch: 'full',
    component: ProfileViewComponent,
  },

  {
    path: 'home',
    pathMatch: 'full',
    component: HomepageComponent,
  },
];
