import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'add',
        loadChildren: () => import('./add-expenses-page/add-expenses-page.module')
          .then((m) => m.AddExpensesPageModule),
      },
    ]),
  ],
})
export class ExpensesModule { }
