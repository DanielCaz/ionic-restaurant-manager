import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./tables/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'admin/tables',
    loadChildren: () =>
      import('./tables/admin-tables/admin-tables.module').then(
        (m) => m.AdminTablesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
