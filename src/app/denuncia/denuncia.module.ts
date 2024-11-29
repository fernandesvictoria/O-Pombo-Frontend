import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { DenunciaRoutingModule } from './denuncia-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DenunciaRoutingModule,
    HttpClientModule,
    FormsModule,
    MenuModule,
  ],
})
export class DenunciaModule {}
