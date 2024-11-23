import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../shared/model/usuario';
import { UsuarioDTO } from '../../../shared/model/usuario-dto';
import { LoginService } from '../../../shared/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public dto: UsuarioDTO = new UsuarioDTO();

  public usuario: Usuario = new Usuario();
  public idUsuario!: number;

  constructor(
    private service: LoginService,
    private router: Router,
  ) { }

  public logar() {
    this.service.autenticar(this.dto).subscribe({
      next: jwt => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        let token: string = jwt.body + "";
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.router.navigate(['/pruu']);
      },
      error: erro => {
        var mensagem: string;
        if (erro.status == 401) {
          mensagem = 'Usuário ou senha inválidos';
        } else {
          mensagem = erro.error;
        }
        Swal.fire('Erro', mensagem, 'error');
      }
    });
  }
}