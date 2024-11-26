import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { UsuarioSeletor } from '../../shared/seletor/usuario.seletor';
import { Router } from 'express';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeletor: UsuarioSeletor = new UsuarioSeletor();
  filtroAtivo: boolean = false;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.pesquisarTodos();
  }

  pesquisarTodos(): void {
    this.carregando = true;
    this.usuarioService.pesquisarTodos().subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
        this.carregando = false;
      },
      error: erro => {
        this.mensagemErro = 'Erro ao carregar a lista de usuários.';
        console.error(erro);
        this.carregando = false;
      }
    });
  }

  aplicarFiltros(): void {
    this.carregando = true;
    this.usuarioService.pesquisarComFiltros(this.usuarioSeletor).subscribe({
      next: usuarios => {
        this.usuarios = usuarios;
        this.filtroAtivo = true;
        this.carregando = false;
      },
      error: erro => {
        this.mensagemErro = 'Erro ao aplicar filtros.';
        console.error(erro);
        this.carregando = false;
      }
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = false;
    this.usuarioSeletor = new UsuarioSeletor();
    this.pesquisarTodos();
  }

  excluirUsuario(idUsuario: string): void {
    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      this.usuarioService.excluir(idUsuario).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== idUsuario);
          alert('Usuário excluído com sucesso!');
        },
        error: erro => {
          this.mensagemErro = 'Erro ao excluir o usuário.';
          console.error(erro);
        }
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.router.navigate([`/usuario/${usuario.id}`]);
  }
}
