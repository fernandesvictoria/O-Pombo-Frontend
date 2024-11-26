import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { DenunciaDetalheComponent } from './denuncia-detalhe/denuncia-detalhe.component';
import { DenunciaListagemComponent } from './denuncia-listagem/denuncia-listagem.component';
import { DenunciaRoutingModule } from './denuncia-routing.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [DenunciaDetalheComponent, DenunciaListagemComponent],
  imports: [CommonModule, DenunciaRoutingModule, HttpClientModule, MenuModule],
})
export class DenunciaModule {}
