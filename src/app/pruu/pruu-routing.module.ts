import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruuCadastroComponent } from './pruu-cadastro/pruu-cadastro.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';

const routes: Routes = [
  { path: '', component: PruuListagemComponent },
  { path: '/postar', component: PruuCadastroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruuRoutingModule { }
