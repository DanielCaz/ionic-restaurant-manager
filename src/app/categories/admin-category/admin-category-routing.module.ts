import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCategoryPage } from './admin-category.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCategoryPageRoutingModule {}
