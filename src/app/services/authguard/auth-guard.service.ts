import { Injectable } from '@angular/core';
import { GAuthenticateService } from '../g-auth/gauthentication.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authenticationServce: GAuthenticateService) { }

  canActivate(): boolean {
    return this.authenticationServce.authenticationState.value;
  }
}
