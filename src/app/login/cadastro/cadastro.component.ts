import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../shared/model/usuario';
import { LoginService } from '../../shared/service/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule],
})

export class CadastroComponent {
  public usuario: Usuario = new Usuario();
  public idUsuario!: number;

  constructor(
    private service: LoginService,
    private router: Router,
  ) { }

  public cadastrar() {
    this.service.cadastrar(this.usuario).subscribe(
      (resposta) => {
        Swal.fire('Usuário cadastrado com sucesso!', '', 'success');
        this.redirecionar();
      },
      (erro) => {
        const mensagemErro = erro?.error?.message || 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        Swal.fire('Erro ao cadastrar-se!', mensagemErro, 'error');
      }
    );
  }

  redirecionar() {
    this.router.navigate(['/']);
  }
}
