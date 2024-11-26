import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Denuncia } from '../../shared/model/denuncia';
import { DenunciaService } from '../../shared/service/denuncia.service';

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
})
export class DenunciaDetalheComponent implements OnInit {
  denuncia!: Denuncia;
  idDenuncia!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciaService: DenunciaService
  ) { }

  ngOnInit(): void {
    // obter o ID da denúncia a partir da rota
    this.idDenuncia = Number(this.route.snapshot.paramMap.get('id'));
    //this.carregarDenuncia();
  }

  // carregarDenuncia(): void {
  //   this.denunciaService.pesquisarPorId(this.idDenuncia).subscribe({
  //     next: (denuncia) => this.denuncia = denuncia,
  //     error: (erro) => {
  //       console.error('Erro ao carregar denúncia', erro);
  //       this.voltarParaListagem();
  //     }
  //   });
  // }

  // voltarParaListagem(): void {
  //   this.router.navigate(['/denuncia']);
  // }

  // excluirDenuncia(): void {
  //   if (confirm('Tem certeza que deseja excluir esta denúncia?')) {
  //     this.denunciaService.excluir(this.idDenuncia.toString()).subscribe({
  //       next: () => {
  //         console.log('Denúncia excluída com sucesso!');
  //         this.voltarParaListagem();
  //       },
  //       error: (erro) => console.error('Erro ao excluir denúncia', erro)
  //     });
  //   }
  // }

  // atualizarStatus(novoStatus: string): void {
  //   this.denunciaService.atualizar(this.idDenuncia.toString(), novoStatus as any).subscribe({
  //     next: (denunciaAtualizada) => {
  //       console.log('Status atualizado com sucesso:', denunciaAtualizada);
  //       this.carregarDenuncia();
  //     },
  //     error: (erro) => console.error('Erro ao atualizar status', erro)
  //   });
  // }
}