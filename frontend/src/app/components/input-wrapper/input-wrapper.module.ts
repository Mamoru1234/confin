import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from './input-wrapper.component';

@NgModule({
  declarations: [InputWrapperComponent],
  exports: [
    InputWrapperComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class InputWrapperModule { }
