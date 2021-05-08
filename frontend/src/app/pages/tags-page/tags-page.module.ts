import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsPageComponent } from './tags-page.component';
import { RouterModule } from '@angular/router';
import { LandingModule } from '../../components/landing/landing.module';
import { ServerErrorContainerModule } from '../../components/server-error-container/server-error-container.module';
import { LoaderModule } from '../../components/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputWrapperModule } from '../../components/input-wrapper/input-wrapper.module';

@NgModule({
  declarations: [
    TagsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TagsPageComponent,
      },
    ]),
    ReactiveFormsModule,
    LandingModule,
    ServerErrorContainerModule,
    LoaderModule,
    InputWrapperModule,
  ],
})
export class TagsPageModule { }
