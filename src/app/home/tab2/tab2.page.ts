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
          bidId: 1,
          driverName: 'Malinga',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 25000,
          vehicle: 'Toyota Rocco'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/lg3.jpg',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        },
        {
          bidId: 2,
          driverName: 'Kule',
          prof_pic: 'assets/icon/lg5.png',
          budget : 15000,
          vehicle: 'BMW M5 Sport'
        }
      ]
  }

  constructor(private modalController: ModalController) { }

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

  
  async presentModal() {

    const modal = await this.modalController.create({
      component: ModalPage,
      
    });

    modal.onDidDismiss().then((dataRet) => {
     
    })
    return await modal.present();
  }

}
