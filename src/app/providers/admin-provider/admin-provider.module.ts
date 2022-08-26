import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProviderPageRoutingModule } from './admin-provider-routing.module';

import { AdminProviderPage } from './admin-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProviderPageRoutingModule,
  ],
  declarations: [AdminProviderPage],
})
export class AdminProviderPageModule {}
