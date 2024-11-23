import { Component, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pruu } from '../../shared/model/pruu';
import { Usuario } from '../../shared/model/usuario';
import { PruuSeletor } from '../../shared/seletor/pruu.seletor';
import { PruuService } from '../../shared/service/pruu.service';
import { UsuarioService } from '../../shared/service/usuario.service';

@Component({
  selector: 'app-pruu-listagem',
  standalone: true,
  imports: [],
  templateUrl: './pruu-listagem.component.html',
  styleUrl: './pruu-listagem.component.scss'
})
export class PruuListagemComponent {
  public usuarioAutenticado!: Usuario;
  public pruus: Array<Pruu> = new Array();

  public seletor: PruuSeletor = new PruuSeletor();

  track!: TrackByFunction<Pruu>;
  trackPruu!: TrackByFunction<Pruu>;

  constructor(
    private pruuService: PruuService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  private listarTodos() {
    this.pruuService.listarTodos().subscribe(
      resultado => {
        this.pruus = resultado;
      },
      erro => {
        console.error('Erro ao buscar todos os pruus! ', erro);
      }
    );
  }

  public listarComSeletor() {
    this.pruuService.listarComSeletor(this.seletor).subscribe(
      resultado => {
        this.pruus = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar pruus!', erro.error, 'error');
      }
    );
  }

  public limpar() {
    this.seletor = new PruuSeletor();
  }

  // alterar tamanho
  exibirImagem(imagemBase64: string) {
    Swal.fire({
      title: 'Imagem do Pruu',
      html: `<img src="data:image/jpg;base64,${imagemBase64}" alt="Imagem do Pruu" style="max-width: 100%; height: auto;">`,
      width: '80%',
      showCloseButton: true,
      showConfirmButton: false,
      background: '#fff',
      padding: '20px'
    });
  }

  curtir(idUsuario: string, idPruu: string): void {
    this.usuarioService.curtir(idUsuario, idPruu).subscribe({
      next: (resposta) => {
        Swal.fire('Pruu curtido!', '', 'success');
      },
      error: (erro) => {
        Swal.fire('Erro ao curtir pruu: ' + erro.error, '', 'error');
      },
    });
  }
}
