import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { AlertController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';


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
      this.uid = res;
      alert(res)
    });

    this.journeyplanForm = this.formBuilder.group({
      start_location: new FormControl('', Validators.compose([
        Validators.required
      ])),
      way_point: new FormControl('', Validators.compose([
        Validators.required
      ])),
      number_of_passenger: new FormControl('', Validators.compose([
        Validators.required
      ])),
      travel_location: new FormControl('', Validators.compose([
        Validators.required
      ])),
      arrival_date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      departure_date: new FormControl('', Validators.compose([
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
      ])),
      user_id: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }



  onSubmit(value) {
    this.tripDetails = JSON.stringify(value);
    console.log(this.tripDetails);

    this.httpClient.post(URL, this.tripDetails).subscribe((res) => {
      if (res[`trip_id`] != null) {
        this.navCtrl.navigateBack('/home/tab1');
        this.notify.showSuccessAlert('Trip plan Sent to Drivers');
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
