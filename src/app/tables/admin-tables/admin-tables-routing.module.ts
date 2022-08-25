import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTablesPage } from './admin-tables.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTablesPageRoutingModule {}
