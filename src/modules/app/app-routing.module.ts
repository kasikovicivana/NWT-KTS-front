import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./../admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'client',
    loadChildren: () =>
      import('./../client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'driver',
    loadChildren: () =>
      import('./../driver/driver.module').then((m) => m.DriverModule),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./../auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
