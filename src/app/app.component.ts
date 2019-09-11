import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Router } from '@angular/router';

import { GAuthenticateService } from '../app/services/g-auth/gauthentication.service';
import { StorageService } from '../app/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home/tab1'
    },
    {
      title: 'Start New Journey',
      url: '/home/journeyplan'
    },
    {
      title: 'Driver Notification',
      url: '/home/tab2',
    },
    {
      title: 'Trip Cancelation',
      url: '/home/tab3'
    }

  ];

  backButtonSubscription;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: GAuthenticateService,
    private push: Push,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.checkToken();
      this.authenticationService.authenticationState.subscribe(state => {
        console.log(state)
        if (state) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['auth']);
        }
      });

      this.pushSetup();
    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '118897244650'
      }
   }

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      this.storageService.setStorageData('device_redId', registration);
    });

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  exit() {
   // shit happens
  }

  logoutButton() {
    // shit happens
  }

}
