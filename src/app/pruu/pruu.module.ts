import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { PruuCadastroComponent } from './pruu-detalhe/pruu-cadastro.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';
import { PruuRoutingModule } from './pruu-routing.module';

@NgModule({
  declarations: [PruuCadastroComponent, PruuListagemComponent],
  imports: [
    CommonModule,
    PruuRoutingModule,
    HttpClientModule
  ]
})
export class PruuModule { }
