import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

/* Ionic Modules */
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

/* Native Modules */
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from './modules/common.module';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    SplashScreen,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
