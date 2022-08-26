import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProductPage } from './admin-product.page';

const routes: Routes = [
  {
    path: '',
    component: AdminProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductPageRoutingModule {}
