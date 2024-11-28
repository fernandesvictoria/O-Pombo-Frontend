import { Component, OnInit } from "@angular/core";
import { Denuncia } from "../../shared/model/denuncia";
import { Pruu } from "../../shared/model/pruu";
import { ActivatedRoute, Router } from "@angular/router";
import { DenunciaService } from "../../shared/service/denuncia.service";
import { DenunciaSeletor } from "../../shared/seletor/denuncia.seletor";
import { StatusDenuncia } from "../../shared/model/enum/status-denuncia";
import Swal from "sweetalert2";

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

  analisarDenuncia(idDenuncia: string, novoStatus: StatusDenuncia): void {
    this.denunciaService.atualizar(idDenuncia, novoStatus).subscribe({
      next: denuncia => {
        Swal.fire('Denúncia atualizada com sucesso!', '', 'success');
        this.voltarParaListagem();
      },
      error: erro => console.error('Erro ao bloquear denúncia', erro)
    });
  }

  voltarParaListagem(): void {
    this.router.navigate(['/denuncia']);
  }
}
