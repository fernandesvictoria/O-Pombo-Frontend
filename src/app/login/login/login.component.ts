import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioDTO } from '../../shared/model/usuario-dto';
import { LoginService } from '../../shared/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public dto: UsuarioDTO = new UsuarioDTO();
  public usuario: Usuario = new Usuario();
  public idUsuario!: number;

  constructor(
    private service: LoginService,
    private router: Router,
  ) { }

  // Método para fazer o login
  public logar() {
    this.service.autenticar(this.dto).subscribe({
      next: jwt => {
        // Salva o token no localStorage
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        const token: string = jwt.body + ''; // Extrai o token
        localStorage.setItem('tokenUsuarioAutenticado', token);

        // Redireciona para a próxima página após sucesso
        this.router.navigate(['pruu']);
      },
      error: erro => {
        // Trata o erro de autenticação
        let mensagem: string;
        if (erro.status === 401) {
          mensagem = 'Usuário ou senha inválidos';
        } else {
          mensagem = erro.error || 'Ocorreu um erro inesperado';
        }
        Swal.fire('Erro', mensagem, 'error');
      }
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
