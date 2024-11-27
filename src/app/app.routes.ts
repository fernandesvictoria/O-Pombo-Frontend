import { Routes } from '@angular/router';
import { DenunciaListagemComponent } from './denuncia/denuncia-listagem/denuncia-listagem.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { LoginComponent } from './login/login/login.component';
import { UsuarioDetalheComponent } from './usuario/usuario-detalhe/usuario-detalhe.component';
import { UsuarioListagemComponent } from './usuario/usuario-listagem/usuario-listagem.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  { path: 'pruu', loadChildren: () => import('./pruu/pruu.module').then(m => m.PruuModule) },
  { path: 'usuario', component: UsuarioDetalheComponent },
  { path: 'usuario/listar', canActivate: [AuthGuard], component: UsuarioListagemComponent },
  { path: 'denuncia', canActivate: [AuthGuard], component: DenunciaListagemComponent },
  { path: '**', redirectTo: 'pruu' },
];
