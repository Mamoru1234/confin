import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginPageComponent,
      },
    ]),
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
