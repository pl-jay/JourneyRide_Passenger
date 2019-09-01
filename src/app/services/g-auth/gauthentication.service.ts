import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import { JwtHelperService } from '@auth0/angular-jwt';

import { NotificationService } from '../notification/notification.service';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

const TOKEN_KEY = '';
const UID       = '';
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private notificationService: NotificationService,
              private storageService: StorageService,
              private jwtHelper: JwtHelperService,
              private loadingController: LoadingController) { }

  registerUser(email, password): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (newUserCredential: firebase.auth.UserCredential) => {
        firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`).set({email});
      }).then( () => {
        this.setUsertokenStorage();
        this.authenticationState.next(true);
      })
      .catch( error => {
        this.authenticationState.next(false);
        throw new Error(error);
      });
  }

  loginUser(value): Promise<firebase.auth.UserCredential | void> {
    return firebase.auth()
    .signInWithEmailAndPassword(value.email, value.password).then((res) => {
      this.setUsertokenStorage();
      this.authenticationState.next(true);
    });
  }

  async logoutUser() {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Loggin out...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(firebase.auth().signOut()).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(() => {
      this.storageService.clearStorageData().then(() => {
        this.authenticationState.next(false);
      });
    });
  }
 
  passwordReset(email): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  setUsertokenStorage() {
    firebase.auth().onAuthStateChanged((result) => {
      this.storageService.setStorageData('UID', result.uid);
      result.getIdToken().then((token) => {
        this.storageService.setStorageData('TOKEN_KEY', token);
      });
    });
  }

  checkToken() {
    this.storageService.getStorageData('TOKEN_KEY').then((token) => {
      if (token) {
        const decoded   = this.jwtHelper.decodeToken(token);
        const isExpired = this.jwtHelper.isTokenExpired(token);
        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storageService.removeStorageData('TOKEN_KEY');
        }
        this.authenticationState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}