import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MapComponent } from './components/map/map.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';

import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'map', component: MapComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: 'activate/:token', component: ActivateAccountComponent },
  { path: 'changePassword/:token', component: PasswordChangeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
