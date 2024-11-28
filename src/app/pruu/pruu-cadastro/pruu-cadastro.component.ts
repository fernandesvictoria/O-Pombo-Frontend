import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pruu } from '../../shared/model/pruu';
import { PruuService } from '../../shared/service/pruu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pruu-cadastro',
  templateUrl: './pruu-cadastro.component.html',
})
export class PruuCadastroComponent implements OnInit {
  pruu: Pruu = new Pruu();

  constructor(
    private pruuService: PruuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public cadastrar(): void {
    console.log(this.pruu); // Verifique no console se os dados estão corretos
    this.pruuService.cadastrar(this.pruu).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Pruu cadastrado com sucesso!', 'success');
        this.router.navigate(['/pruu']);
      },
      error: erro => {
        Swal.fire('Erro', 'Erro ao cadastrar o Pruu. Tente novamente.', 'error');
        console.error('Erro ao cadastrar Pruu', erro);
      },
    });
  }

  public cancelar(): void {
    this.router.navigate(['/pruu']);
  }
}
