import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InfoEditPageRoutingModule } from './info-edit-routing.module';

import { InfoEditPage } from './info-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InfoEditPageRoutingModule,
  ],
  declarations: [InfoEditPage]
})
export class InfoEditPageModule {}
