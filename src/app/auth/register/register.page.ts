import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';
import { NotificationService } from '../../services/notification/notification.service';


import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;

  validationMessages = {
   email: [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
   ],
   password: [
     { type: 'required', message: 'Password is required.' },
     { type: 'minlength', message: 'Password must be at least 5 characters long.' }
   ]
 };
 
  constructor(
    private navCtrl: NavController,
    private authService: GAuthenticateService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
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


  async tryRegister(value) {

    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();
    from(this.authService.registerUser(value.email, value.password)).pipe(
      finalize(() => loading.dismiss())
    )
     .subscribe(res => {
       this.notificationService.showSuccessAlert('Your account has been created. Please log in.');
     }, err => {
       this.notificationService.showErrorAlert(err.message);
     });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
