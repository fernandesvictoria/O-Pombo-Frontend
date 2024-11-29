import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Denuncia, DenunciaDados } from '../../shared/model/denuncia';
import { DenunciaSeletor } from '../../shared/seletor/denuncia.seletor';
import { DenunciaService } from '../../shared/service/denuncia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusDenuncia } from '../../shared/model/enum/status-denuncia';
import Swal from 'sweetalert2';
import { Motivo } from '../../shared/model/enum/motivo';
import { MenuModule } from '../../menu/menu.module';
import { Pruu } from '../../shared/model/pruu';

@Component({
  selector: 'app-denuncia-listagem',
  templateUrl: './denuncia-listagem.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, MenuModule],
})
export class DenunciaListagemComponent implements OnInit {
  denuncias: Denuncia[] = [];
  dadosDenuncias: DenunciaDados[] = [];
  filtroAtivo: boolean = false;
  denunciaSeletor: DenunciaSeletor = new DenunciaSeletor();
  novoStatus: StatusDenuncia = StatusDenuncia.PENDENTE;
  denuncia!: Denuncia;

  constructor(
    private denunciaService: DenunciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pesquisarTodas();
  }

  pesquisarTodas(): void {
      this.denunciaService.pesquisarTodas().subscribe(
        resultado => {
          this.dadosDenuncias = resultado;
          console.log(resultado);
        }
      );
  }

  pesquisarComFiltros(): void {
    this.denunciaService.pesquisarComFiltros(this.denunciaSeletor).subscribe({
      next: (denuncias) => {
        this.denuncias = denuncias;
        this.filtroAtivo = true;
      },
      error: (erro) => console.error('Erro ao aplicar filtros', erro),
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = false;
    this.denunciaSeletor = new DenunciaSeletor();
    this.pesquisarTodas();
  }

  excluir(idDenuncia: string): void {
    this.denunciaService.excluir(idDenuncia).subscribe({
      next: (sucesso) => {
        if (sucesso) {
          console.log('Denúncia excluída com sucesso!');
          this.pesquisarTodas();
        }
      },
      error: (erro) => console.error('Erro ao excluir denúncia', erro),
    });
  }

  analisarDenuncia(idDenuncia: string): void {
    this.router.navigate([`denuncia/${idDenuncia}`]);
  }
}
