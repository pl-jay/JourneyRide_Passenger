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

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  LatLang: any;
  marker: any;
  myLat: any;
  myLong: any;



  constructor(
    private geolocation: Geolocation,
    public platform: Platform,
    public nav: NavController) {
  }
  ngOnInit() {
    this.currentPlace();
    this.platform.ready().then( () => {
      this.loadMap();
    });
  }

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

}
