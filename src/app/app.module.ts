import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalPageModule } from '../app/home/modal/modal.module';

import { environment } from 'src/environments/environment';
import { GAuthenticateService } from './services/g-auth/gauthentication.service';
import { AuthGuardService } from './services/authguard/auth-guard.service';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Push } from '@ionic-native/push/ngx';

export function jwtOptionFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['*']
  }
}


firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ModalPageModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionFactory,
        deps: [Storage],
      }
    }),
    AppRoutingModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    GAuthenticateService,
    AuthGuardService,
    Geolocation,
    GoogleMaps,
    Push
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
