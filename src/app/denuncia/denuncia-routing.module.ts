import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DenunciaDetalheComponent } from './denuncia-detalhe/denuncia-detalhe.component';
import { DenunciaListagemComponent } from './denuncia-listagem/denuncia-listagem.component';

const routes: Routes = [
  { path: 'denuncia/:id', component: DenunciaDetalheComponent },
  { path: 'denuncia', component: DenunciaListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule { }
