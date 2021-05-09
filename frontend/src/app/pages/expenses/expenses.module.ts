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
      {
        path: 'show',
        loadChildren: () => import('./show-expenses-page/show-expenses-page.module').then(m => m.ShowExpensesPageModule),
      },
    ]),
  ],
})
export class ExpensesModule { }
