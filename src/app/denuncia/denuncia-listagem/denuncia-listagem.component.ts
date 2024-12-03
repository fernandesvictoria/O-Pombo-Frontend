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
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';

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
  usuarios: Usuario[] = [];
  motivos: string[] = [];

  constructor(
    private denunciaService: DenunciaService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.pesquisarTodas();
    this.buscarUsuarios();
    this.motivos = Object.keys(Motivo).filter((key) => isNaN(Number(key)));
  }

  pesquisarTodas(): void {
    this.denunciaService.pesquisarTodas().subscribe((resultado) => {
      this.dadosDenuncias = resultado;
      console.log(resultado);
    });
  }

  pesquisarComFiltros(): void {
    // Ajusta as datas para garantir que a hora seja 00:00
    if (this.denunciaSeletor.criadoEmInicio) {
     this.denunciaSeletor.criadoEmInicio = this.ajustarDataParaInicioDoDia(
        this.denunciaSeletor.criadoEmInicio
      );
    }
    if (this.denunciaSeletor.criadoEmFim) {
      this.denunciaSeletor.criadoEmFim = this.ajustarDataParaInicioDoDia(
        this.denunciaSeletor.criadoEmFim
      );
    }

    console.log('Data de início:', this.denunciaSeletor.criadoEmInicio);
    console.log('Data de fim:', this.denunciaSeletor.criadoEmFim);

    console.log('Motivo', this.denunciaSeletor.motivo)

    this.denunciaService.pesquisarComFiltros(this.denunciaSeletor).subscribe({
      next: (denuncias) => {
        this.denuncias = denuncias;
        this.filtroAtivo = true;
      },
      error: (erro) => console.error('Erro ao aplicar filtros', erro),
    });
  }


  private buscarUsuarios() {
    this.usuarioService.pesquisarTodos().subscribe(
      (r) => {
        this.usuarios = r;
      },
      (e) => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao consultar todos os clientes: ' + e.error.mensagem,
          icon: 'error',
        });
      }
    );
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

  // Função para ajustar a data para o início do dia (00:00:00)
  ajustarDataParaInicioDoDia(date: string): string {
    // Verifica se a data foi fornecida no formato correto
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('A data deve estar no formato yyyy-MM-dd');
    }

    // Adiciona o horário 00:00:00 à data
    const formattedDate = `${date}T00:00:00`;
    return formattedDate; // Exemplo: "2024-12-02T00:00:00"
  }
}
