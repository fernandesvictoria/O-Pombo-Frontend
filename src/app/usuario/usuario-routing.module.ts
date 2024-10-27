import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';

const routes: Routes = [
  { path: '', component: UsuarioListagemComponent },
  { path: 'usuario/:id', component: UsuarioDetalheComponent },
  { path: 'usuario', component: UsuarioListagemComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
