import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Denuncia } from "../../shared/model/denuncia";
import { Pruu } from "../../shared/model/pruu";
import { DenunciaService } from "../../shared/service/denuncia.service";
import { PruuService } from "../../shared/service/pruu.service";

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
})
export class DenunciaDetalheComponent implements OnInit {
  denuncia!: Denuncia;
  pruusDenunciados: Pruu[] = [];
  idDenuncia!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciaService: DenunciaService,
    private pruuService: PruuService
  ) { }

  ngOnInit(): void {
    this.idDenuncia = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDenuncia();
    this.carregarPruusDenunciados();
  }

  carregarDenuncia(): void {
    this.denunciaService.pesquisarPorId(this.idDenuncia).subscribe({
      next: (denuncia) => (this.denuncia = denuncia),
      error: (erro) => {
        console.error('Erro ao carregar denúncia', erro);
        this.voltarParaListagem();
      },
    });
  }

  carregarPruusDenunciados(): void {
    this.pruuService
      .pesquisarComFiltro({ idDenuncia: this.idDenuncia } as any) // Ajuste o seletor conforme necessário
      .subscribe({
        next: (pruus) => (this.pruusDenunciados = pruus),
        error: (erro) => console.error('Erro ao carregar pruus denunciados', erro),
      });
  }

  voltarParaListagem(): void {
    this.router.navigate(['/denuncia']);
  }
}
