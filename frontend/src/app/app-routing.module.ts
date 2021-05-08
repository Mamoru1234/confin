import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'expenses',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/expenses/expenses.module').then(m => m.ExpensesModule),
  },
  {
    path: 'tags',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tags-page/tags-page.module').then(m => m.TagsPageModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
