import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';

export const AuthRoutes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegistrationComponent,
  },

  {
    path: 'activate/:token',
    pathMatch: 'full',
    component: ActivateAccountComponent,
  },

  {
    path: 'changePassword/:token',
    pathMatch: 'full',
    component: PasswordChangeComponent,
  },
];
