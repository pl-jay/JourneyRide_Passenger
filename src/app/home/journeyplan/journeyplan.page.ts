import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


const URL = environment.url + 'createTrip';
@Component({
  selector: 'app-journeyplan',
  templateUrl: './journeyplan.page.html',
  styleUrls: ['./journeyplan.page.scss'],
})

export class JourneyplanPage implements OnInit {

  journeyplanForm: FormGroup;
  tripDetails: any;
  uid: any;

  validationMessage = {
     type: 'required', message: 'All fields are required.'
  };

  constructor(private formBuilder: FormBuilder,
              public alertController: AlertController,
              private httpClient: HttpClient,
              private storage: StorageService,
              private navCtrl: NavController,
              private notify: NotificationService) { }

  ngOnInit() {

    this.storage.getStorageData('user_token').then((res) => {
      
    });

    this.journeyplanForm = this.formBuilder.group({
      start_location: new FormControl('', Validators.compose([
        Validators.required
      ])),
      waypoint: new FormControl('', Validators.compose([
        Validators.required
      ])),
      no_of_passengers: new FormControl('', Validators.compose([
        Validators.required
      ])),
      destination: new FormControl('', Validators.compose([
        Validators.required
      ])),
      date_to: new FormControl('', Validators.compose([
        Validators.required
      ])),
      date_from: new FormControl('', Validators.compose([
        Validators.required
      ])),
      pickup_time: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ac_condition: new FormControl('', Validators.compose([
        Validators.required
      ])),
      vehicle_type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      trip_description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }



  onSubmit(value) {
    value.passenger_id = 1;
    this.tripDetails = value;
    this.httpClient.post(URL, this.tripDetails).subscribe((res) => {
      if (res[`trip_id`] != null) {
        this.storage.setStorageData('trip_id', res[`trip_id`]).then(()=>{
          this.navCtrl.navigateBack('/home/tab1');
          this.notify.showSuccessAlert('Trip plan Sent to Drivers');
        });
      }
    });
  }

  async presentAlertConfirm(value) {
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
            this.onSubmit(value);
          }
        }
      ]
    });

    await alert.present();
  }

}
