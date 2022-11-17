/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader , TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient)
{
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  })],
  providers: [AuthGuard,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
