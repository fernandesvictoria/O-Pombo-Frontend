import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PruuCadastroComponent } from './pruu-cadastro/pruu-cadastro.component';
import { PruuRoutingModule } from './pruu-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RequestInterceptor } from '../auth/request.interceptor';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [
    PruuCadastroComponent,
    PruuListagemComponent
  ],
  imports: [
    CommonModule,
    PruuRoutingModule,
    FormsModule,
    SharedModule,
    MenuModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([RequestInterceptor])
    ),
  ],
})
export class PruuModule { }
