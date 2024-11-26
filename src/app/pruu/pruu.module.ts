import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestInterceptor } from '../auth/request.interceptor';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../shared/shared.module';
import { PruuCadastroComponent } from './pruu-cadastro/pruu-cadastro.component';
import { PruuListagemComponent } from './pruu-listagem/pruu-listagem.component';
import { PruuRoutingModule } from './pruu-routing.module';

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
    MenuModule,
    RouterModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([RequestInterceptor])
    ),
  ],
})
export class PruuModule { }
