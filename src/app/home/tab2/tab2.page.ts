import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public anArray: any = [];
  data: boolean;

  bidDetails = {
      bid1: [
        {
          bidId: 1,
          driverName: 'Malinga',
          prof_pic: 'assets/icon/a.jpg',
          budget : 25000,
          vehicle: 'Toyota Rocco'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/a.jpg',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/a.jpg',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/a.jpg',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        }
      ]
  }

  constructor() { }

  ngOnInit() {

  }
  goTo() {
    console.log('this.anArray', this.anArray);
    this.data = true;
    }
  Add(){
    this.anArray.push({'value':''});
    }

  onClick(id) {
    alert(id + 'trip confirmed !');
  }

}
