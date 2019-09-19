import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { environment } from '../../../environments/environment';


const URL = environment.url;
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  details;
  tsId: number;
  area: string;
  company_name: string;
  budget: number;
  v_type: string;
  v_brand: string;
  contact: number;
  driverId: number;

  constructor(private modalController: ModalController, 
              private navParams: NavParams,
              private alertController: AlertController,
              private storageService: StorageService,
              private loadingController: LoadingController,
              private httpClient: HttpClient,
              private notify: NotificationService) { }

  ngOnInit() {
    this.tsId = this.navParams.data.details[`ts_id`];
    this.area = this.navParams.data.details[`area`];
    this.company_name = this.navParams.data.details[`comapny_ame`];
    this.budget = this.navParams.data.details[`budget`];
    this.v_type = this.navParams.data.details[`v_type`];
    this.v_brand = this.navParams.data.details[`v_brand`];
    this.contact = this.navParams.data.details[`contact`];
    this.driverId = this.navParams.data.details[`driver`];

  }

  async confirmTrip(id) {
    console.log(this.driverId)
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.sendRequest(id);
          }
        }, {
          text: 'No'
        }
      ]
    });

    await alert.present();
  }

  async sendRequest(id) {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Confirming Offer...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    return from(this.httpClient.get(URL + 'passenger_confirm_trip/' + `${id}`)).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((res) => {
      if (res) {
        this.notify.showSuccessAlert('Confirmation Success !');
        this.storageService.setStorageData('driver_id', this.driverId).then(()=>{
          this.closeModal();
        });
      } else {
        this.notify.showErrorAlert('Cannot Confirm the Offer at this moment !');
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
