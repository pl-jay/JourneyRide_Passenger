import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentialsForm: FormGroup;
  newUser: any;

  validationMessages = {
    username: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private gAuthService: GAuthenticateService,) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
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
    this.newUser = value;
    this.gAuthService.loginmethod(this.newUser).then((res) => {
      console.log(res);
    });
  }

}
