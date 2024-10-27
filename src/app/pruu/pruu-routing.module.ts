import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruuDetalheComponent } from './pruu-detalhe/pruu-detalhe.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';

const routes: Routes = [
  { path: '', component: PruuListagemComponent },
  { path: 'pruu/:id', component: PruuDetalheComponent },
  { path: 'pruu', component: PruuListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruuRoutingModule { }
