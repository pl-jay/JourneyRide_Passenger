import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { NotificationService } from '../../services/notification/notification.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  newUser: any;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private gAuthService: GAuthenticateService,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private notificationService: NotificationService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  async loginUser(value) {
    this.newUser = JSON.stringify(value);
    this.gAuthService.loginmethod(this.newUser);
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/auth/register');
  }
  goToPasswordResetPage() {
    this.navCtrl.navigateForward('/auth/passwordreset');
  }
  loggin() {
    this.navCtrl.navigateForward('/home/tab1');
  }
}
