import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DenunciaDetalheComponent } from './denuncia-detalhe/denuncia-detalhe.component';
import { DenunciaListagemComponent } from './denuncia-listagem/denuncia-listagem.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: DenunciaListagemComponent, canActivate: [AuthGuard]
  },
  {
    path: '/:id', component: DenunciaDetalheComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule { }
