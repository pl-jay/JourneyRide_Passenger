import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Platform, NavController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: any;
  LatLang: any;
  marker: any;


  constructor(
    private geolocation: Geolocation,
    public platform: Platform,
    public nav: NavController) {
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }


  loadMap() {
    const mapOptions = {
      controls: {
        myLocationButton: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false,
        fullscreenControl: false
      },
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // this.geolocation.getCurrentPosition().then( pos => {
    //   const LatLang = new google.maps.LatLang(pos.coords.latitude, pos.coords.longitude);
    //   this.map.setCenter(LatLang);
    // });

  }

}
