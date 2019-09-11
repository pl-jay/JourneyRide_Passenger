import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { JwtHelperService } from '@auth0/angular-jwt';

import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = '';
const UID       = '';
const URL       = environment.url;
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private notificationService: NotificationService,
              private storageService: StorageService,
              private jwtHelper: JwtHelperService,
              private loadingController: LoadingController,
              private httpClient: HttpClient
              ) { }

  async loginmethod(value) {
    console.log(value)
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin in...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.httpClient.post(URL + 'login.php', value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      this.storageService.setStorageData('user_token', res[`uid`]).then(() => {
        this.checkToken();
      });
    });

  }

  async registermethod(value) {
    console.log(value)
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Creating account...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.httpClient.post(URL + 'register.php', value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      this.storageService.setStorageData('user_token', res[`uid`]).then(() => {
        this.checkToken();
      });
    });

  }

  checkToken() {
    this.storageService.getStorageData('user_token').then((token) => {
      if (token) {
        this.authenticationState.next(true);
      } else {
        this.authenticationState.next(false);
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}