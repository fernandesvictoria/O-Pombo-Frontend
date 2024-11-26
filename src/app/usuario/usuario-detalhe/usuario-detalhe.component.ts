import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
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
    const idUsuario = this.route.snapshot.paramMap.get('id');
    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    } else {
      this.mensagemErro = 'ID do usuário não foi informado.';
    }
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
