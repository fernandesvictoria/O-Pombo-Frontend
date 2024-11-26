import { Component, OnInit } from "@angular/core";
import { Denuncia } from "../../shared/model/denuncia";
import { Pruu } from "../../shared/model/pruu";
import { ActivatedRoute, Router } from "@angular/router";
import { DenunciaService } from "../../shared/service/denuncia.service";
import { DenunciaSeletor } from "../../shared/seletor/denuncia.seletor";

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
})
export class DenunciaDetalheComponent implements OnInit {
  denunciaSeletor: DenunciaSeletor = new DenunciaSeletor();
  denuncia!: Denuncia;
  idDenuncia!: number;
  pruu!: Pruu;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciaService: DenunciaService
  ) { }

  ngOnInit(): void {
    this.idDenuncia = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDenuncia();
  }

  carregarDenuncia(): void {
    this.denunciaService.pesquisarPorId(this.idDenuncia).subscribe({
      next: (denuncia) => {
        this.denuncia = denuncia;
        this.pruu = denuncia.pruu; 
      },
      error: (erro) => {
        console.error('Erro ao carregar denúncia', erro);
        this.voltarParaListagem();
      },
    });
  }

  // pesquisarTodos(): void {
  //   this.denunciaService.pesquisarComFiltro(this.denunciaSeletor).subscribe({
  //     next: denuncias => this.denuncia = denuncias,
  //     error: erro => console.error('Erro ao buscar denúncias', erro)
  //   });
  // }

  // atualizarDenuncia(idDenuncia: string, novoStatus: string): void {
  //   this.denunciaService.atualizar(idDenuncia, novoStatus as any).subscribe({
  //     next: denunciaAtualizada => {
  //       console.log('Denúncia atualizada:', denunciaAtualizada);
  //       this.pesquisarTodos();
  //     },
  //     error: erro => console.error('Erro ao atualizar denúncia', erro)
  //   });
  // }

  voltarParaListagem(): void {
    this.router.navigate(['/denuncia']);
  }
}
