import { Component, OnInit } from "@angular/core";
import { Denuncia } from "../../shared/model/denuncia";
import { Pruu } from "../../shared/model/pruu";
import { ActivatedRoute, Router } from "@angular/router";
import { DenunciaService } from "../../shared/service/denuncia.service";

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
})
export class DenunciaDetalheComponent implements OnInit {
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

  voltarParaListagem(): void {
    this.router.navigate(['/denuncia']);
  }
}
