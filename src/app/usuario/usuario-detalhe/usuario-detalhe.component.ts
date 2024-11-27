import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class UsuarioDetalheComponent implements OnInit {
  usuario!: Usuario;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('tokenUsuarioAutenticado');
    const tokenJSON: any = jwtDecode(token!);
    this.carregarUsuario(tokenJSON.idUsuario!);
  }

  editar(): void {
    if (!this.usuario || !this.usuario.id) {
      this.mensagemErro = 'Usuário inválido. Verifique os dados.';
      return;
    }

    this.usuarioService.atualizar(this.usuario).subscribe({
      next: (resultado) => {
        if (resultado) {
          alert('Usuário atualizado com sucesso!');
          this.router.navigate(['/usuarios']); // Redireciona para a lista de usuários ou outra página
        } else {
          this.mensagemErro = 'Falha ao atualizar o usuário. Tente novamente.';
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.mensagemErro = 'Ocorreu um erro. Tente novamente mais tarde.';
      }
    });
  }

  carregarUsuario(idUsuario: string): void {
    this.carregando = true;
    this.usuarioService.pesquisarPorId(idUsuario).subscribe({
      next: usuario => {
        this.usuario = usuario;
        this.carregando = false;
      },
      error: erro => {
        this.mensagemErro = 'Erro ao carregar os detalhes do usuário.';
        console.error(erro);
        this.carregando = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/usuario']);
  }
}
