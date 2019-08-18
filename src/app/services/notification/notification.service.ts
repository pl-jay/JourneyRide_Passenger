import { Injectable } from '@angular/core';
import { ToastController, Platform  } from '@ionic/angular';

// import { FcmService } from '../fcmService/fcm.service';

// import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  async showSuccessAlert(msg) {
    const alert = this.toastController.create({
      header: 'Success',
      message: msg,
      buttons: ['OK'],
      duration: 4000
    });

    alert.then(newalert => newalert.present());
  }


  async showErrorAlert(msg) {
    const alert = this.toastController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
      duration: 4000
    });

    alert.then(newalert => newalert.present());
  }


}
