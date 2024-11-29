import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuModule } from '../../menu/menu.module';
import { Denuncia } from '../../shared/model/denuncia';
import { StatusDenuncia } from '../../shared/model/enum/status-denuncia';
import { Pruu } from '../../shared/model/pruu';
import { DenunciaSeletor } from '../../shared/seletor/denuncia.seletor';
import { DenunciaService } from '../../shared/service/denuncia.service';

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, MenuModule],
})
export class DenunciaDetalheComponent implements OnInit {
  denunciaSeletor: DenunciaSeletor = new DenunciaSeletor();
  denuncia!: Denuncia;
  status!: string;
  idDenuncia!: string;
  pruu!: Pruu;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private denunciaService: DenunciaService
  ) {}

  ngOnInit(): void {
    this.idDenuncia = this.route.snapshot.paramMap.get('id')!;
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

  atualizarStatus(pruu: Pruu): void {
    Swal.fire({
      title: 'Denunciar Pruu',
      input: 'select',
      inputOptions: {
        [StatusDenuncia.ACEITA]: 'a',
        [StatusDenuncia.REJEITADA]: 'dcfdffg de ódio',
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
        this.status = value;
        return null;
      },
    }).then((resultado) => {
      this.denunciaService.atualizar(this.idDenuncia, this.status).subscribe({
        next: () => Swal.fire('Denúncia criada com sucesso!'),
        error: (erro) =>
          Swal.fire(
            'Erro!',
            'Ocorreu um problema ao registrar sua denúncia.',
            'error'
          ),
      });
    });
  }

  voltarParaListagem(): void {
    this.router.navigate(['/denuncia']);
  }
}
