import { Routes } from '@angular/router';
import { CadastroComponent } from './login/cadastro/cadastro.component';
import { LoginComponent } from './login/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DenunciaListagemComponent } from './denuncia/denuncia-listagem/denuncia-listagem.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'denuncia', canActivate: [AuthGuard], component: DenunciaListagemComponent },
  { path: '**', redirectTo: 'pruu' },
];