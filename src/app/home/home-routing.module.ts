import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:
      [ { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
        { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
        { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
        { path: 'journeyplan', loadChildren: './journeyplan/journeyplan.module#JourneyplanPageModule' },
        { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' }
      ]
  },
  {
    path: '',
    redirectTo: '/home/tab1',
    pathMatch: 'full'
  },
  {
    path: 'journey',
    redirectTo: '/home/journeyplan',
    pathMatch: 'full'
  }

];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class HomeRoutingModule {}

