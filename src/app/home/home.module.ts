import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AuthenticationService } from '../authentication.service';
import { AuthGuard } from '../auth.guard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [HomePage],
  providers: [AuthenticationService,AuthGuard]
})
export class HomePageModule {}
