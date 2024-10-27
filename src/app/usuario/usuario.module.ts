import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { UsuarioDetalheComponent } from './usuario-detalhe/usuario-detalhe.component';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [UsuarioDetalheComponent, UsuarioListagemComponent],
  imports: [CommonModule, UsuarioRoutingModule, HttpClientModule],
})
export class UsuarioModule { }
