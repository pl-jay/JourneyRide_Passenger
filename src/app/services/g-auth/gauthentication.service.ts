import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

import { NotificationService } from '../notification/notification.service';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'access_token';
 
@Injectable()
export class GAuthenticateService {

  authenticationState = new BehaviorSubject(false);
  user = null;

  constructor(private notificationService: NotificationService, private storage: Storage) { }

  registerUser(email, password): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (newUserCredential: firebase.auth.UserCredential) => {
        firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`).set({email});
      })
      .catch( error => {
        throw new Error(error);
      });
  }

  loginUser(value): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
  }

  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
 
  userDetails() {
    return firebase.auth().currentUser;
  }

  passwordReset(email): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  setUsertokenStorage() {
    firebase.auth().onAuthStateChanged((resulst) =>{
      console.log(resulst.email);
      console.log(resulst.uid);
      resulst.getIdToken().then((token) => {
        alert(token)
      })
    })
  }
}