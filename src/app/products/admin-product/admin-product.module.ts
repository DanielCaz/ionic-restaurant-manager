import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductPageRoutingModule } from './admin-product-routing.module';

import { AdminProductPage } from './admin-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductPageRoutingModule
  ],
  declarations: [AdminProductPage]
})
export class AdminProductPageModule {}
