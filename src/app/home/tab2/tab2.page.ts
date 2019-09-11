import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

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
          bidId: 0,
          driverName: 'Malinga1',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 21000,
          vehicle: 'Toyota Rocco'
        },
        {
          bidId: 1,
          driverName: 'Malinga',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 25000,
          vehicle: 'Toyota Rocco'
        },
        {
          bidId: 2,
          driverName: 'Kule2',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 12000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 3,
          driverName: 'Kule3',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 13000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 4,
          driverName: 'Kule4',
          prof_pic: 'assets/icon/lg5.png',
          budget : 14000,
          vehicle: 'BMW M5 Sport'
        }
      ]
  }

  constructor(private modalController: ModalController) { }

  DataRet: any;

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

  
  async presentModal(id) {

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        details: this.bidDetails.bid1[id]
      }
    });

    modal.onDidDismiss().then((dataRet) => {
      if (dataRet !== null) {
        this.DataRet = dataRet.data;
      }
    });
    return await modal.present();
  }

}
