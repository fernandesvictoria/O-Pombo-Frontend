import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './../../shared/service/login.service';
import { UsuarioDTO } from '../../shared/model/usuario-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(private loginService: LoginService,
    private router: Router) {
  }

  public realizarLogin() {

    this.loginService.autenticar(this.dto)
      .subscribe({
        next: jwt => {
          Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
          let token: string = jwt.body + "";
          localStorage.setItem('tokenUsuarioAutenticado', token);
          this.router.navigate(['/home']);
        },
        error: erro => {
          var mensagem: string;
          if (erro.status == 401) {
            mensagem = "Usuário ou senha inválidos, tente novamente";
          } else {
            mensagem = erro.error;
          }
          Swal.fire('Erro', mensagem, 'error');
        }
      });
  }

  public cadastro() {
    this.router.navigate(['login/cadastro']);
  }
}