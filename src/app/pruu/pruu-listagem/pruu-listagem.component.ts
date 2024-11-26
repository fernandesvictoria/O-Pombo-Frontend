import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pruu } from '../../shared/model/pruu';
import { Usuario } from '../../shared/model/usuario';
import { PruuSeletor } from '../../shared/seletor/pruu.seletor';
import { PruuService } from '../../shared/service/pruu.service';
import { Denuncia } from '../../shared/model/denuncia';
import { DenunciaService } from '../../shared/service/denuncia.service';
import { Motivo } from '../../shared/model/enum/motivo';
import { StatusDenuncia } from '../../shared/model/enum/status-denuncia';
import { UsuarioService } from '../../shared/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pruu-listagem',
  templateUrl: './pruu-listagem.component.html',
})
export class PruuListagemComponent implements OnInit {
  usuarios: Usuario[] = [];
  pruus: Pruu[] = [];
  filtroAtivo: boolean = false;
  pruuSeletor: PruuSeletor = new PruuSeletor();
  totalPaginas: number = 0;
  mensagemErro: string = '';
  readonly itensPorPagina: number = 5;

  usuarioAutenticado!: Usuario;

  constructor(
    private pruuService: PruuService,
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pruuSeletor.limite = this.itensPorPagina;
    this.pruuSeletor.pagina = 1;

    this.pesquisarTodos();
    this.buscarUsuarios();
  }



  private buscarUsuarios() {
    this.usuarioService.pesquisarTodos().subscribe(
      (r) => {
        this.usuarios = r;
      },
      (e) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao consultar todos os clientes: ' + e.error.mensagem,
          icon: 'error',
        });
      }
    );
  }

  pesquisarTodos(): void {
    this.pruuService.pesquisarTodos(this.pruuSeletor).subscribe({
      next: (pruus) => (this.pruus = pruus),
      error: (erro) => console.error('Erro ao buscar Pruus', erro),
    });
  }

  aplicarFiltros(): void {
    // Ajusta as datas para garantir que a hora seja 00:00
    if (this.pruuSeletor.criadoEmInicio) {
      this.pruuSeletor.criadoEmInicio = this.ajustarDataParaInicioDoDia(
        this.pruuSeletor.criadoEmInicio
      );
    }
    if (this.pruuSeletor.criadoEmFim) {
      this.pruuSeletor.criadoEmFim = this.ajustarDataParaInicioDoDia(
        this.pruuSeletor.criadoEmFim
      );
    }

    this.pruuService.pesquisarComFiltro(this.pruuSeletor).subscribe({
      next: (pruus) => {
        this.pruus = pruus;
        this.filtroAtivo = true;
      },
      error: (erro) => console.error('Erro ao aplicar filtros', erro),
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = false;
    this.pruuSeletor = new PruuSeletor();
    this.pesquisarTodos();
  }

  curtir(pruu: Pruu): void {
    const usuarioJaCurtiu = pruu.usuariosQueCurtiram.some(
      (usuario) => usuario.id === this.usuarioAutenticado.id
    );

    if (usuarioJaCurtiu) {
      pruu.usuariosQueCurtiram = pruu.usuariosQueCurtiram.filter(
        (usuario) => usuario.id !== this.usuarioAutenticado.id
      );
      pruu.quantidadeCurtidas--;
    } else {
      pruu.usuariosQueCurtiram.push(this.usuarioAutenticado);
      pruu.quantidadeCurtidas++;
    }

    this.pruuService.curtir(pruu.id, this.usuarioAutenticado.id).subscribe({
      next: () =>
        console.log('Ação de curtir/descurtir realizada com sucesso!'),
      error: (erro) => console.error('Erro ao curtir/descurtir', erro),
    });
  }

  denunciar(pruu: Pruu, motivo: Motivo): void {
    const novaDenuncia: Denuncia = {
      id: 0,
      pruu: pruu,
      usuario: this.usuarioAutenticado,
      motivo: motivo,
      status: StatusDenuncia.PENDENTE,
    };

    this.denunciaService.cadastrar(novaDenuncia).subscribe({
      next: () => console.log('Denúncia criada com sucesso!'),
      error: (erro) => console.error('Erro ao criar denúncia', erro),
    });
  }

  // Função para ajustar a data para o início do dia (00:00:00)
  ajustarDataParaInicioDoDia(data: Date): Date {
    const date = new Date(data);
    date.setHours(0, 0, 0, 0); // Define a hora para 00:00:00
    return date; // Retorna um objeto Date
  }
}
