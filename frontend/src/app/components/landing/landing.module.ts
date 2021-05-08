import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';



@NgModule({
  declarations: [
    LandingComponent,
  ],
  exports: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class LandingModule { }
