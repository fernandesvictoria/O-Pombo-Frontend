import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, UsuarioRoutingModule, HttpClientModule, FormsModule],
})
export class UsuarioModule { }
