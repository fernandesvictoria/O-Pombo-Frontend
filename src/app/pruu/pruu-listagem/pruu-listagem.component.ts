import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pruu } from '../../shared/model/pruu';
import { Usuario } from '../../shared/model/usuario';
import { PruuSeletor } from '../../shared/seletor/pruu.seletor';
import { PruuService } from '../../shared/service/pruu.service';
import { Denuncia } from '../../shared/model/denuncia';
import { DenunciaService } from '../../shared/service/denuncia.service';
import { Motivo } from '../../shared/model/enum/motivo';
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
  pruuCurtido: Pruu[] = [];

  public denuncia!: Denuncia;
  // Define o tipo corretamente para a lista de motivos
  public motivosDenuncia: Array<Motivo> = [];
  public selectedMotivo: Motivo | null = null;


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
    this.carregarMotivos();
  }

  private carregarMotivos(): void {
    // Filtra para pegar apenas os valores que pertencem ao enum Motivo
    this.motivosDenuncia = Object.values(Motivo)
      .filter((value) => Object.values(Motivo).includes(value))
      .map((value) => value as Motivo);  // Converte para o tipo Motivo
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
    this.pruuService.pesquisarComFiltro(this.pruuSeletor).subscribe({
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
    this.pruuService.curtir(pruu.id).subscribe({
      next: (response) => {
        // Usando subscribe para obter o Pruu após a consulta
        this.pruuService.pesquisarPorId(pruu.id).subscribe({
          next: (pruuCurtido) => {
            // Agora você pode acessar a propriedade 'quantidadeCurtidas' de 'pruuCurtido'
            pruu.quantidadeCurtidas = pruuCurtido.quantidadeCurtidas;
            // pruu.usuariosQueCurtiram = response.usuariosQueCurtiram;
            console.log('Ação de curtir/descurtir realizada com sucesso!');
          },
          error: (erro) => console.error('Erro ao buscar o Pruu', erro),
        });
      },
      error: (erro) => console.error('Erro ao curtir/descurtir', erro),
    });
  }

  // denunciar(pruu: Pruu, motivo: Motivo): void {
  //   const novaDenuncia: Denuncia = {
  //     id: 0,
  //     pruu: pruu,
  //     usuario: this.usuarioAutenticado,
  //     motivo: motivo,
  //     status: StatusDenuncia.PENDENTE,
  //   };

  //   this.denunciaService.cadastrar(novaDenuncia).subscribe({
  //     next: () => console.log('Denúncia criada com sucesso!'),
  //     error: (erro) => console.error('Erro ao criar denúncia', erro),
  //   });
  // }

  // public denunciarPruu(pruu: Pruu): void {
  //   Swal.fire({
  //     title: 'Denunciar Pruu',
  //     input: 'select',
  //     inputOptions: {
  //       [Motivo.SPAM]: 'Spam',
  //       [Motivo.DISCURSO_ODIO]: 'Discuso de ódio',
  //       [Motivo.CONTEUDO_INAPROPRIADO]: 'Inapropriado',
  //     },
  //     inputLabel: 'Selecione o motivo da denúncia',
  //     inputPlaceholder: 'Escolha um motivo',
  //     showCancelButton: true,
  //     confirmButtonText: 'Enviar',
  //     cancelButtonText: 'Cancelar',
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'Você precisa selecionar um motivo para denunciar!';
  //       }
  //       return null;
  //     },
  //   }).then((resultado) => {
  //     if (resultado.isConfirmed) {
  //       this.denuncia = {
  //         motivo: resultado.value,
  //         pruu: {
  //           id: pruu.id,
  //           texto: pruu.texto,
  //           imagem: pruu.imagem || '',
  //           quantidadeCurtidas: pruu.quantidadeCurtidas,
  //           criadoEm: new Date(pruu.criadoEm),
  //           quantidadeDenuncias: pruu.quantidadeDenuncias,
  //           usuario: new Usuario,
  //           usuariosQueCurtiram: [],
  //           denuncias: [],
  //           bloqueado: false
  //         } ,

  //       };

  //       this.denunciaService.criarDenuncia(this.denuncia).subscribe({
  //         next: (response) => {
  //           Swal.fire('Enviado!', 'Sua denúncia foi registrada.', 'success');
  //         },
  //         error: (erro) => {
  //           console.error('Erro ao denunciar:', erro);
  //           Swal.fire(
  //             'Erro!',
  //             'Ocorreu um problema ao registrar sua denúncia.',
  //             'error'
  //           );
  //         },
  //       });
  //     }
  //   });
  // }

  usuariosQueCurtiram(pruu: Pruu): void {
    this.pruuService.pesquisarUsuariosQueCurtiram(pruu.id).subscribe({
      next: (usuarios) => {
        const nomes = usuarios.map((u) => u.nome).join(', ');
        Swal.fire('Usuários que curtiram', nomes, 'info');
      },
      error: (erro) => console.error('Erro ao buscar usuários que curtiram', erro),
    });
  }

  public excluir(pruu: Pruu): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.pruuService.excluir(pruu.id, pruu.usuario.id).subscribe({
          next: () => {
            // Remove o Pruu da lista localmente
            this.pruus = this.pruus.filter((p) => p.id !== pruu.id);
            Swal.fire('Excluído!', 'O Pruu foi excluído com sucesso.', 'success');
          },
          error: (erro) => {
            console.error('Erro ao excluir o Pruu:', erro);
            Swal.fire('Erro!', 'Não foi possível excluir o Pruu.', 'error');
          },
        });
      }
    });
  }

  // Função para ajustar a data para o início do dia (00:00:00)
  ajustarDataParaInicioDoDia(data: Date): Date {
    const date = new Date(data);
    date.setHours(0, 0, 0, 0); // Define a hora para 00:00:00
    return date; // Retorna um objeto Date
  }
}
