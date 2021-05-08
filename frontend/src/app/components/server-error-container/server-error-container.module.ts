import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerErrorContainerComponent } from './server-error-container.component';



@NgModule({
  declarations: [ServerErrorContainerComponent],
  exports: [
    ServerErrorContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ServerErrorContainerModule { }
