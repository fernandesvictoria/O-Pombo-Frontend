import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    // Chamadas de rotas filhas
    // Exemplo: http://localhost:4200/home/pruus
    //               /home: carrega o HomeModule
    //               '' (entre 'home' e 'pruus'): carrega o HomeComponent
    //               /cartas: carrega o PruuModule
    children: [
      {
        path: 'pruus',
        loadChildren: () => import('../pruu/pruu.module').then(m => m.PruuModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }