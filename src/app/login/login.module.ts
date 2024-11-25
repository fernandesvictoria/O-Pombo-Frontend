import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestInterceptor } from '../auth/request.interceptor';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [
    provideHttpClient(
      withInterceptors([RequestInterceptor])
    ),
  ],
})
export class LoginModule { }
