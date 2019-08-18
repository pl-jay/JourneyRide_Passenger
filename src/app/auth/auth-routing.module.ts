import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './auth.page';

const routes: Routes = [
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'passwordreset', loadChildren: './passwordreset/passwordreset.module#PasswordresetPageModule' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports:
    [ RouterModule.forChild(routes) ],
  exports:
    [ RouterModule ]
})

export class AuthRoutingModule { }
