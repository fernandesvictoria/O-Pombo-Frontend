import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Denuncia } from '../../shared/model/denuncia';
import { DenunciaSeletor } from '../../shared/seletor/denuncia.seletor';
import { DenunciaService } from '../../shared/service/denuncia.service';

@Component({
  selector: 'app-denuncia-listagem',
  templateUrl: './denuncia-listagem.component.html',
})
export class DenunciaListagemComponent implements OnInit {
  denuncias: Denuncia[] = [];
  filtroAtivo: boolean = false;
  denunciaSeletor: DenunciaSeletor = new DenunciaSeletor();
  totalPaginas: number = 0;
  readonly itensPorPagina: number = 5;

  constructor(private denunciaService: DenunciaService, private router: Router) { }

  ngOnInit(): void {
    this.denunciaSeletor.limite = this.itensPorPagina;
    this.denunciaSeletor.pagina = 1;

    this.pesquisarTodos();
  }

  pesquisarTodos(): void {
    this.denunciaService.pesquisarComFiltro(this.denunciaSeletor).subscribe({
      next: denuncias => this.denuncias = denuncias,
      error: erro => console.error('Erro ao buscar denúncias', erro)
    });
  }

  aplicarFiltros(): void {
    this.denunciaService.pesquisarComFiltro(this.denunciaSeletor).subscribe({
      next: denuncias => {
        this.denuncias = denuncias;
        this.filtroAtivo = true;
      },
      error: erro => console.error('Erro ao aplicar filtros', erro)
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = false;
    this.denunciaSeletor = new DenunciaSeletor();
    this.pesquisarTodos();
  }

  excluirDenuncia(idDenuncia: string): void {
    this.denunciaService.excluir(idDenuncia).subscribe({
      next: sucesso => {
        if (sucesso) {
          console.log('Denúncia excluída com sucesso!');
          this.pesquisarTodos();
        }
      },
      error: erro => console.error('Erro ao excluir denúncia', erro)
    });
  }

  atualizarDenuncia(idDenuncia: string, novoStatus: string): void {
    this.denunciaService.atualizar(idDenuncia, novoStatus as any).subscribe({
      next: denunciaAtualizada => {
        console.log('Denúncia atualizada:', denunciaAtualizada);
        this.pesquisarTodos();
      },
      error: erro => console.error('Erro ao atualizar denúncia', erro)
    });
  }

  detalharDenuncia(idDenuncia: number): void {
    this.router.navigate([`/denuncia/${idDenuncia}`]);
  }
}
