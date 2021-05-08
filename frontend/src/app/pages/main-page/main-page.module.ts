import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule } from '@angular/router';
import { LandingModule } from '../../components/landing/landing.module';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
      },
    ]),
    LandingModule,
  ],
})
export class MainPageModule { }
