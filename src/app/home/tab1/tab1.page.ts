import { Component, OnInit } from '@angular/core';

import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { StorageService } from '../../services/storage/storage.service';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private gAuth: GAuthenticateService, 
              private notificationService: NotificationService, 
              private storageService: StorageService) { }

  ngOnInit() {
  }

  logout() {
    this.gAuth.logoutUser().then((res) => {
      this.notificationService.showSuccessAlert('You logged Out !');
    }).catch((err) => {
      this.notificationService.showErrorAlert(err.message);
      throw new Error(err);
    })
  }
}
