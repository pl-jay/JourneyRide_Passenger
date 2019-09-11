import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ModalPageModule } from '../app/home/modal/modal.module';

import { GAuthenticateService } from './services/g-auth/gauthentication.service';
import { AuthGuardService } from './services/authguard/auth-guard.service';


import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Push } from '@ionic-native/push/ngx';

export function jwtOptionFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['*']
  }
}



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ModalPageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionFactory,
        deps: [Storage],
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GAuthenticateService,
    AuthGuardService,
    Geolocation,
    HttpClient,
    GoogleMaps,
    Push
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
