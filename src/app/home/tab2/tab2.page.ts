import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';

import { environment } from '../../../environments/environment';

const URL = environment.url;
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public anArray: any = [];
  data: boolean;

  constructor(private modalController: ModalController,
              private storageService: StorageService,
              private httpClient: HttpClient,
              private loadingController: LoadingController,
              private notify: NotificationService) { }

  // Variable Declaration
  DataRet: any;
  ps_id: number;
  trip_id: number;
  bidDetails: any;
  modal_data: any;
  result_is_empty = true;

  ngOnInit() {
    this.storageService.getStorageData('user_id').then((res) => {
      this.ps_id = res;
    })
    this.storageService.getStorageData('trip_id').then((res) => {
      this.trip_id = res;
    })
  }

  async load_data(){
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Getting Data...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    const params = new HttpParams({
      fromString: `${this.trip_id}`
    });

    return from(this.httpClient.get(URL + 'trip_status/' + `${this.trip_id}`)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      if (res != null) {
        this.bidDetails = res;
        if (res[0]){this.result_is_empty = false;}
        this.notify.showSuccessAlert('Drivers responded !');
      } else {
        this.notify.showErrorAlert(res[`error`]);
      }
    });
  }

  async presentModal(id) {

    this.bidDetails.forEach(element => {
      if (element[`ts_id`] === id) {
        this.modal_data = element;
      }
    });
    
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        details: this.modal_data
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
