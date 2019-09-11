import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';
import { NotificationService } from '../../services/notification/notification.service';
import { StorageService } from '../../services/storage/storage.service';

import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  fbId: string;
  newUser: any;

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
    private notificationService: NotificationService,
    private storageService: StorageService,
    private httpClient: HttpClient
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
      username: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }


  tryRegister(value) {
      const user = {
          user_role: 0,
          user_name: value.username,
          email: value.email,
          password: value.password
      }
      this.newUser = JSON.stringify(user);

      this.authService.registermethod(this.newUser);
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }
}
