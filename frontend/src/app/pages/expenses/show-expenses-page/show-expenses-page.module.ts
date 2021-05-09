import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowExpensesPageComponent } from './show-expenses-page.component';
import { LandingModule } from '../../../components/landing/landing.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';
import { LoaderModule } from '../../../components/loader/loader.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShowExpensesPageComponent
  ],
  imports: [
    CommonModule,
    LandingModule,
    ServerErrorContainerModule,
    LoaderModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShowExpensesPageComponent,
      },
    ]),
  ],
})
export class ShowExpensesPageModule { }
