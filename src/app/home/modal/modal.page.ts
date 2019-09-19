import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.tsId = this.navParams.data.details[`ts_id`];
    this.area = this.navParams.data.details[`area`];
    this.company_name = this.navParams.data.details[`comapny_ame`];
    this.budget = this.navParams.data.details[`budget`];
    this.v_type = this.navParams.data.details[`v_type`];
    this.v_brand = this.navParams.data.details[`v_brand`];
    this.contact = this.navParams.data.details[`contact`]

  }

  confirmTrip() {
    alert('are u sure ?' + this.tsId);
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
