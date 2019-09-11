import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';

import { GAuthenticateService } from '../app/services/g-auth/gauthentication.service';

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
    }

  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: GAuthenticateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.checkToken();
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['auth']);
        }
      });
    });
  }

  logoutButton() {
    this.authenticationService.logoutmethod();
  }

}
