import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification/notification.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-journeyplan',
  templateUrl: './journeyplan.page.html',
  styleUrls: ['./journeyplan.page.scss'],
})

export class JourneyplanPage implements OnInit {

  journeyplanForm: FormGroup;
  myLat: any;
  myLong: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private geolocation: Geolocation,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.journeyplanForm = this.formBuilder.group({
      loc_from: [''],
      waypoints: this.formBuilder.array([
        this.initWaypointFields()
      ]),
      no_psngr: [''],
      loc_pickup: [''],
      no_nights: [''],
      date_from: [''],
      date_to: [''],
      pickup_time: [''],
      vehicle_condition: [''],
      vehicle_type: [''],
      desc: ['']
    });
  }

  initWaypointFields(): FormGroup {
    return this.formBuilder.group({
        waypoint : ['', Validators.required]
    });
  }

  addNewInputField() {
    const control =  this.journeyplanForm.controls.waypoints as FormArray;
    control.push(this.initWaypointFields());
  }

  removeInputField(i: number) {
   const control = this.journeyplanForm.controls.waypoints as FormArray;
   control.removeAt(i);
}

  onSubmit() {
    console.log(this.journeyplanForm.value);
    this.router.navigate(['/home/tab2']);
  }

  getCurrentPlaceCords() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.myLat = resp.coords.latitude;
        this.myLong = resp.coords.longitude;
        console.log(this.myLat);
        console.log(this.myLong);
        this.notificationService.showSuccessAlert('Latitude: ' + this.myLat+' Logntitude: '+this.myLong)
     }).catch((error) => {
      this.notificationService.showErrorAlert(error.message);
     });
  }

}
