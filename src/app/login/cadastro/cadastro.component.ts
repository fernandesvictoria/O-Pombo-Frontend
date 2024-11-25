import { Component } from '@angular/core';
import { Usuario } from '../../shared/model/usuario';
import { LoginService } from '../../shared/service/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Perfil } from '../../shared/model/enum/perfil'; // Importe a enumeração de perfis

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
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
        Swal.fire('Usuario cadastrado com sucesso!', '', 'success');
        this.redirecionar();
      },
      (erro) => {
        Swal.fire('Erro ao cadastrar-se!', erro, 'error');
      }
    );
  }

  redirecionar() {
    this.router.navigate(['/']);
  }
}