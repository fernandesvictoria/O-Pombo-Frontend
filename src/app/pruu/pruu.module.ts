import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PruuCadastroComponent } from './pruu-cadastro/pruu-cadastro.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';
import { PruuRoutingModule } from './pruu-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RequestInterceptor } from '../auth/request.interceptor';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PruuRoutingModule,
    PruuCadastroComponent,
    PruuListagemComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([RequestInterceptor])
    ),
  ],
})
export class PruuModule { }
