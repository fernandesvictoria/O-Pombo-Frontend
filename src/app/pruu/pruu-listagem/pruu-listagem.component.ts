import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pruu } from '../../shared/model/pruu';
import { Usuario } from '../../shared/model/usuario';
import { PruuSeletor } from '../../shared/seletor/pruu.seletor';
import { PruuService } from '../../shared/service/pruu.service';

@Component({
  selector: 'app-pruu-listagem',
  templateUrl: './pruu-listagem.component.html',
})
export class PruuListagemComponent implements OnInit {
isCurtido: any;


denunciar(arg0: any) {
 throw new Error('Method not implemented.');
}



  pruus: Pruu[] = [];
  filtroAtivo: boolean = false;
  pruuSeletor: PruuSeletor = new PruuSeletor();
  totalPaginas: number = 0;
  readonly itensPorPagina: number = 5;

  usuarioAutenticado!: Usuario;


  constructor(private pruuService: PruuService, private router: Router) { }

  ngOnInit(): void {
    this.pruuSeletor.limite = this.itensPorPagina;
    this.pruuSeletor.pagina = 1;

    this.pesquisarTodos();
  }

  pesquisarTodos(): void {
    this.pruuService.pesquisarTodos(this.pruuSeletor).subscribe({
      next: pruus => this.pruus = pruus,
      error: erro => console.error('Erro ao buscar Pruus', erro)
    });
  }

  aplicarFiltros(): void {
    this.pruuService.pesquisarComFiltro(this.pruuSeletor).subscribe({
      next: pruus => {
        this.pruus = pruus;
        this.filtroAtivo = true;
      },
      error: erro => console.error('Erro ao aplicar filtros', erro)
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = false;
    this.pruuSeletor = new PruuSeletor();
    this.pesquisarTodos();
  }

  curtir(pruu: Pruu): void {
    const usuarioJaCurtiu = pruu.usuariosQueCurtiram.some(usuario => usuario.id === this.usuarioAutenticado.id);

    if (usuarioJaCurtiu) {
      pruu.usuariosQueCurtiram = pruu.usuariosQueCurtiram.filter(usuario => usuario.id !== this.usuarioAutenticado.id);
      pruu.quantidadeCurtidas--;
    } else {
      pruu.usuariosQueCurtiram.push(this.usuarioAutenticado);
      pruu.quantidadeCurtidas++;
    }

    this.pruuService.curtir(pruu.id, this.usuarioAutenticado.id).subscribe({
      next: () => console.log('Ação de curtir/descurtir realizada com sucesso!'),
      error: erro => console.error('Erro ao curtir/descurtir', erro)
    });
  }
}
