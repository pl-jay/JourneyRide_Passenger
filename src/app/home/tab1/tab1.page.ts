import { Component, OnInit } from '@angular/core';

import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private gAuth: GAuthenticateService, 
              private notificationService: NotificationService, 
              private storageService: StorageService,
              private http: HttpClient) { }

  ngOnInit() {
    
  }

  // logout() {
  //   this.gAuth.logoutUser().then((res) => {
  //     this.notificationService.showSuccessAlert('You logged Out !');
  //   }).catch((err) => {
  //     this.notificationService.showErrorAlert(err.message);
  //     throw new Error(err);
  //   })
  // }

  getRegId() {
    this.storageService.getStorageData('device_redId').then((res) =>{
      
    })
  }

  test() {
    this.http.get('http://pathumlakshan.pythonanywhere.com/users').subscribe((res) => {
      console.log(res);
    })

    this.http.get('http://127.0.0.1:5000/owners').subscribe((res) => {
      console.log(res);
    })
  }
}

/* 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  LocationService,
  GoogleMapOptions
} from '@ionic-native/google-maps';

import { Platform, NavController } from '@ionic/angular';


private geolocation: Geolocation,
    public platform: Platform,


    
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  LatLang: any;
  marker: any;
  myLat: any;
  myLong: any;


this.currentPlace();
  this.platform.ready().then( () => {
    this.loadMap();
  });
  currentPlace() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.myLat = resp.coords.latitude;
      this.myLong = resp.coords.longitude;

      console.log(this.myLat);
      console.log(this.myLong);

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  loadMap() {
    const mapOptions: GoogleMapOptions = {
      controls: {
        myLocationButton: true
      },
    }

    const map = GoogleMaps.create( 'map', mapOptions );
    map.one( GoogleMapsEvent.MAP_READY )
    .then( ( data: any ) => {
      const coordinates: LatLng = new LatLng( this.myLat, this.myLong );

      const position = {
        target: coordinates,
        zoom: 15
      };

      map.animateCamera(position);

      const markerOptions: MarkerOptions = {
        position: coordinates,
        title: 'Your are here !'
      };

      const marker = map.addMarker( markerOptions )
      .then( ( marker: Marker ) => {
        marker.showInfoWindow();
      });
    });
  }
*/