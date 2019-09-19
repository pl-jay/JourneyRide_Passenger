import { Injectable } from '@angular/core';

import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const URL = environment.url;
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private storageService: StorageService,
              private loadingController: LoadingController,
              private httpClient: HttpClient,
              private notify: NotificationService
              ) { }

  async loginmethod(value) {
    console.log(value)
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin in...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    return from(this.httpClient.post(URL + 'login', value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      if (res[`success`] == 1) {
        this.storageService.setStorageData('access_token', res[`access_token`])
        this.storageService.setStorageData('refresh_token', res[`refresh_token`])
        this.storageService.setStorageData('user_id', res[`user_id`]).then(() => {
          this.checkToken();
          this.notify.showSuccessAlert('Loggin Success !');
        });
      } else {
        this.notification(res);
      }
    });

  }

  async logoutmethod() {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin out...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.storageService.clearStorageData()).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      this.checkToken();
      this.notify.showSuccessAlert('Logout Success !');
    });

  }

  async registermethod(value) {
    
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Creating account...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.httpClient.post(URL + 'registration', value)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      console.log(res)
      if(res[`success`] == 1) {
        this.notify.showSuccessAlert('Registration Success !');
      } else {
        this.notify.showErrorAlert(res[`error`]);
      }
    });

  }

  checkToken() {
    this.storageService.getStorageData('access_token').then((token) => {
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

  notification(value) {
    if (value[`error`] != null) {
      this.notify.showErrorAlert(value[`error`]);
    } 
  }
}