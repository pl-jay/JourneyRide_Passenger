import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification/notification.service';
import { environment } from '../../../environments/environment';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';

const URL = environment.url + 'passenger/start_new_trip.php';
@Component({
  selector: 'app-journeyplan',
  templateUrl: './journeyplan.page.html',
  styleUrls: ['./journeyplan.page.scss'],
})

export class JourneyplanPage implements OnInit {

  journeyplanForm: FormGroup;
  tripDetails: any;
  uid: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private geolocation: Geolocation,
              private notificationService: NotificationService,
              public alertController: AlertController,
              private httpClient: HttpClient,
              private storage: StorageService) { }

  ngOnInit() {

    this.storage.getStorageData('user_token').then((res) => {
      this.uid = res;
      console.log(this.uid);
    });

    this.journeyplanForm = this.formBuilder.group({
      start_location: [''],
      way_point: [''],
      number_of_passenger: [''],
      travel_location: [''],
      arrival_date: [''],
      departure_date: [''],
      pickup_time: [''],
      ac_condition: [''],
      vehicle_type: [''],
      trip_description: [''],
      user_id: this.uid
    });
  }



  onSubmit(value) {
    this.tripDetails = JSON.stringify(value);
    console.log(this.tripDetails);

    this.httpClient.post(URL, this.tripDetails).subscribe((res) => {
      console.log(res);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Is there anything to change',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'No',
          handler: () => {
            console.log('Confirm Okay');
            console.log(this.journeyplanForm.value);
          }
        }
      ]
    });

    await alert.present();
  }

}
