import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { environment } from '../../../environments/environment';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

const URL = environment.url + 'set_driver_feedback';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})



export class Tab3Page implements OnInit {
 
  passengerId: number;
  driverId: number;


  feedbackForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private httpClient: HttpClient,
              private storage: StorageService,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private notify: NotificationService) {
  }
  ngOnInit() {
    this.storage.getStorageData('driver_id').then((res) =>{
      this.driverId = res;
    });
    this.storage.getStorageData('user_id').then((res) => {
      this.passengerId = res;
    });
    this.feedbackForm = this.formBuilder.group({
      feedback: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  async sendFeedback(value) {
    console.log('on 1')
    const feedback = {
      driver_id: this.driverId,
      passenger_id: this.passengerId,
      feedback: value.feedback
    }

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Sending Feedack Data...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return from(this.httpClient.post(URL, feedback)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      if (res != null) {
        console.log('on 1')
        this.notify.showSuccessAlert('Feedback has sent !');
      } else {
        console.log('on 1')
        this.notify.showErrorAlert('Something went Wrong !');
      }
    });

  }
}


