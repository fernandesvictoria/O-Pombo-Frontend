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
import { StatusDenuncia } from '../../shared/model/enum/status-denuncia';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-pruu-listagem',
  templateUrl: './pruu-listagem.component.html',
})
export class PruuListagemComponent implements OnInit {
  usuarioAdmin: boolean = false;
  usuarios: Usuario[] = [];
  pruus: Pruu[] = [];
  filtroAtivo: boolean = false;
  pruuSeletor: PruuSeletor = new PruuSeletor();
  totalPaginas: number = 0;
  mensagemErro: string = '';
  readonly itensPorPagina: number = 5;
  usuarioAutenticadoId!: string;
  usuarioAutenticado: Usuario = new Usuario();
  pruuCurtido: Pruu[] = [];
  selectedPruu: any;

  public denuncia!: Denuncia;
  // Define o tipo corretamente para a lista de motivos
  public motivosDenuncia: Array<Motivo> = [];
  public selectedMotivo: Motivo | null = null;

  constructor(
    private pruuService: PruuService,
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    let token;
    if (this.cookieService.check('tokenUsuarioAutenticado')) {
      token = this.cookieService.get('tokenUsuarioAutenticado');
    }
    if (token) {
      let tokenJSON: any = jwtDecode(token);
      this.usuarioAutenticadoId = tokenJSON?.idUsuario;
      this.usuarioService.pesquisarPorId(this.usuarioAutenticadoId).subscribe({
        next: (usuario) => {
          this.usuarioAutenticado = usuario;
        },
        error: (erro) =>
          console.error('Erro ao buscar o usuário autenticado', erro),
      });
    }

    this.pruuSeletor.limite = this.itensPorPagina;
    this.pruuSeletor.pagina = 1;

    this.pesquisarTodos();
    this.buscarUsuarios();
    this.carregarMotivos();
  }

  paginaAnterior(){
    this.pruuSeletor.pagina--;
    this.aplicarFiltros()
  }

  proximaPagina() {
    this.pruuSeletor.pagina++;
    this.aplicarFiltros()
  }

  irParaPagina(indicePagina: number) {
    this.pruuSeletor.pagina = indicePagina;
    this.pesquisarTodos();
  }

  // Método para criar um array de páginas para ser utilizado no ngFor do HTML
  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  public contarPaginas() {
    this.pruuService.contarPaginas(this.pruuSeletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de páginas', erro.error, 'error');
      }
    );
  }

  private carregarMotivos(): void {
    // Filtra para pegar apenas os valores que pertencem ao enum Motivo
    this.motivosDenuncia = Object.values(Motivo)
      .filter((value) => Object.values(Motivo).includes(value))
      .map((value) => value as Motivo); // Converte para o tipo Motivo
  }

  private buscarUsuarios() {
    this.usuarioService.pesquisarTodos().subscribe(
      (r) => {
        this.usuarios = r;
      },
      (e) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao consultar todos os pruus: ' + e.error?.mensagem,
          icon: 'error',
        });
      }
    );
  }

  pesquisarTodos(): void {
    this.pruuService.pesquisarComFiltro(this.pruuSeletor).subscribe({
      next: (pruus) => {
        this.contarPaginas()
        this.pruus = pruus;
      },
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

  denunciar(pruuId: string): void {
    Swal.fire({
      title: 'Denunciar Pruu',
      input: 'select',
      inputOptions: {
        [Motivo.SPAM]: 'Spam',
        [Motivo.DISCURSO_ODIO]: 'Discurso de ódio',
        [Motivo.CONTEUDO_INAPROPRIADO]: 'Conteúdo inapropriado',
      },
      inputLabel: 'Selecione o motivo da denúncia',
      inputPlaceholder: 'O que não te agradou neste Pruu?',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Você precisa escolher um motivo para denunciar!';
        }
        return null;
      },
    }).then((resultado) => {
      const pruu = this.pruus.find((p) => p.id == pruuId);

      if (resultado.isConfirmed) {
        this.denuncia = {
          pruu: pruu!,
          usuario: this.usuarioAutenticado,
          motivo: resultado.value,
          status: StatusDenuncia.PENDENTE,
        };
        this.denunciaService.cadastrar(this.denuncia).subscribe({
          next: () => Swal.fire('Denúncia criada com sucesso!'),
          error: (erro) =>
            Swal.fire(
              'Erro!',
              'Ocorreu um problema ao registrar sua denúncia.',
              'error'
            ),
        });
      }
    });
  }

  usuariosQueCurtiram(pruu: Pruu): void {
    this.pruuService.pesquisarUsuariosQueCurtiram(pruu.id).subscribe({
      next: (usuarios) => {
        const nomes = usuarios.map((u) => u.nome).join(', ');
        console.log(nomes);
        if (nomes.length) {
          Swal.fire({
            title: 'Esse pruublicação está bombando!',
            text: 'Esses pombos gostaram: ' + nomes,
            icon: 'info',
          });
        } else {
          Swal.fire(
            'Parece que este pombo ainda não encontrou seu ninho...',
            'O pruu selecionado não possui nenhuma curtida',
            'info'
          );
        }
      },
      error: (erro) =>
        console.error('Erro ao buscar usuários que curtiram', erro),
    });
  }

  pesquisarPruusCurtidosPeloUsuario(): void {
    console.log(this.usuarioAutenticadoId);
    this.pruuService
      .pesquisarPruusCurtidosPeloUsuario(this.usuarioAutenticadoId)
      .subscribe({
        next: (pruus) => {
          console.log(pruus);
          this.pruus = pruus;
          this.filtroAtivo = true;
        },
        error: (erro) =>
          console.error(
            'Erro ao pesquisar os Pruus curtidos pelo usuário',
            erro
          ),
      });
  }

  excluir(pruuId: string): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        const pruu = this.pruus.find((p) => p.id == pruuId);

        this.pruuService.excluir(pruu!.id).subscribe({
          next: () => {
            // Remove o Pruu da lista localmente
            this.pruus = this.pruus.filter((p) => p.id !== pruu!.id);
            Swal.fire(
              'Excluído!',
              'O Pruu foi excluído com sucesso.',
              'success'
            );
            window.location.reload()
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
  ajustarDataParaInicioDoDia(date: string): string {
    // Verifica se a data foi fornecida no formato correto
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('A data deve estar no formato yyyy-MM-dd');
    }

    // Adiciona o horário 00:00:00 à data
    const formattedDate = `${date}T00:00:00`;
    return formattedDate; // Exemplo: "2024-12-02T00:00:00"
  }

  openModal(pruu: Pruu) {
    console.log('Pruu selecionado:', pruu);
    this.selectedPruu = pruu;
  }

  public isAdmin(): boolean {
    this.usuarioAdmin = this.authService.isAdmin();
    return this.usuarioAdmin;
  }
}
