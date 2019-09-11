import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  details;
  bidId: number;
  driverName: string;
  budget: number;
  vehicle: string;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.bidId = this.navParams.data.details[`bidId`];
    this.driverName = this.navParams.data.details[`driverName`];
    this.budget = this.navParams.data.details[`budget`];
    this.vehicle = this.navParams.data.details[`vehicle`];

  }

  confirmTrip() {
    alert('are u sure ?');
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
