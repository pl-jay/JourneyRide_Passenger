import { Component, OnInit } from '@angular/core';

import { GAuthenticateService } from '../../services/g-auth/gauthentication.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})

export class PasswordresetPage implements OnInit {
  public resetPasswordForm: FormGroup;
  constructor(private authService: GAuthenticateService,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private router: Router) {
                this.resetPasswordForm = this.formBuilder.group({
                  email: [
                    '',
                    Validators.compose([Validators.required, Validators.email]),
                  ],
                });
               }

  ngOnInit() {
  }


  // resetPassword(resetPasswordForm: FormGroup): void {
  //   if (!resetPasswordForm.valid) {
  //     console.log(
  //       'Form is not valid yet, current value:', resetPasswordForm.value
  //     );
  //   } else {
  //     const email: string = resetPasswordForm.value.email;
  //     this.authService.passwordReset(email).then(
  //       async () => {
  //         const alert = await this.alertCtrl.create({
  //           message: 'Check your email for a password reset link',
  //           buttons: [
  //             {
  //               text: 'Ok',
  //               role: 'cancel',
  //               handler: () => {
  //                 this.router.navigateByUrl('/auth/login');
  //               },
  //             },
  //           ],
  //         });
  //         await alert.present();
  //       },
  //       async error => {
  //         const errorAlert = await this.alertCtrl.create({
  //           message: error.message,
  //           buttons: [{ text: 'Ok', role: 'cancel' }],
  //         });
  //         await errorAlert.present();
  //       }
  //     );
  //   }
  // }
}
