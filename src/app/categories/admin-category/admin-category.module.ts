import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCategoryPageRoutingModule } from './admin-category-routing.module';

import { AdminCategoryPage } from './admin-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCategoryPageRoutingModule
  ],
  declarations: [AdminCategoryPage]
})
export class AdminCategoryPageModule {}
