import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'pruu',
    loadChildren: () => import('./pruu/pruu.module').then(m => m.PruuModule)
  },
];