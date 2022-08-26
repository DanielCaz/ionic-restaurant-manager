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
  {
    path: 'admin/providers',
    loadChildren: () =>
      import('./providers/admin-provider/admin-provider.module').then(
        (m) => m.AdminProviderPageModule
      ),
  },
  {
    path: 'admin/categories',
    loadChildren: () =>
      import('./categories/admin-category/admin-category.module').then(
        (m) => m.AdminCategoryPageModule
      ),
  },
  {
    path: 'admin/products',
    loadChildren: () =>
      import('./products/admin-product/admin-product.module').then(
        (m) => m.AdminProductPageModule
      ),
  },
  {
    path: 'admin/users',
    loadChildren: () =>
      import('./users/admin-users/admin-users.module').then(
        (m) => m.AdminUsersPageModule
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
