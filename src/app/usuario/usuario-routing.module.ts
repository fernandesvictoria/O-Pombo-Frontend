import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: UsuarioListagemComponent, canActivate: [AuthGuard] },
  { path: '/:id', component: UsuarioDetalheComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
