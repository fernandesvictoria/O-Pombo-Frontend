import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { PruuDetalheComponent } from './pruu-detalhe/pruu-detalhe.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';
import { PruuRoutingModule } from './pruu-routing.module';

@NgModule({
  declarations: [PruuDetalheComponent, PruuListagemComponent],
  imports: [
    CommonModule,
    PruuRoutingModule,
    HttpClientModule
  ]
})
export class PruuModule { }
