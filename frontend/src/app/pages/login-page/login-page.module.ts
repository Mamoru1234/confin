import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputWrapperModule } from '../../components/input-wrapper/input-wrapper.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { ServerErrorContainerModule } from '../../components/server-error-container/server-error-container.module';

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
    InputWrapperModule,
    LoaderModule,
    ServerErrorContainerModule,
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
