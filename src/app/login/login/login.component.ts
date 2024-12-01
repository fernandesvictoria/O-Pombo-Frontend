import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioDTO } from '../../shared/model/usuario-dto';
import { LoginService } from '../../shared/service/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class LoginComponent {
  public dto: UsuarioDTO = new UsuarioDTO();
  public usuario: Usuario = new Usuario();
  public idUsuario!: number;

  constructor(
    private service: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.cookieService.delete('tokenUsuarioAutenticado');
  }

  public logar() {
    this.service.autenticar(this.dto).subscribe({
      next: (jwt) => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        const token: string = jwt.body + '';
        localStorage.setItem('tokenUsuarioAutenticado', token);

        this.cookieService.set('tokenUsuarioAutenticado', token, 1);

        this.router.navigate(['pruu']);
      },
      error: (erro) => {
        let mensagem: string;
        if (erro.status === 401) {
          mensagem = 'Usuário ou senha inválidos';
        } else {
          mensagem = erro.mensagem || 'Ocorreu um erro inesperado';
        }
        Swal.fire('Erro', mensagem, 'error');
      },
    });
  }

  public estaAutenticado(): boolean {
    return this.service.estaAutenticado();
  }

  public sair() {
    this.service.sair();
    this.router.navigate(['/login']);
  }
}
