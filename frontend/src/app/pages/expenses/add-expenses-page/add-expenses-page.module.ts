import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddExpensesPageComponent } from './add-expenses-page.component';
import { LandingModule } from '../../../components/landing/landing.module';
import { ServerErrorContainerModule } from '../../../components/server-error-container/server-error-container.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../../components/input-wrapper/input-wrapper.module';

@NgModule({
  declarations: [
    AddExpensesPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddExpensesPageComponent,
      },
    ]),
    LandingModule,
    ServerErrorContainerModule,
    ReactiveFormsModule,
    InputWrapperModule,
  ],
})
export class AddExpensesPageModule { }
