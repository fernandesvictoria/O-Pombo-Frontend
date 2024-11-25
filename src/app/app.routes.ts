import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'pruu',
    loadChildren: () => import('./pruu/pruu.module').then(m => m.PruuModule)
  },
];