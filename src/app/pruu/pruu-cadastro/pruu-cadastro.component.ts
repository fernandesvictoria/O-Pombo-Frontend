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
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private pruuService: PruuService,
    private router: Router
  ) {}

  ngOnInit(): void {}


  public cadastrar(): void {
    this.pruuService.cadastrar(this.pruu).subscribe({
      next: (response) => {
        Swal.fire('Sucesso', 'Pruu cadastrado com sucesso!', 'success');
        if (this.selectedFile) {
          this.uploadImagem(response.id);
        } else {
          this.voltar();
        }
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

  // seleciona arquivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  uploadImagem(idPruu: string): void {
    if (!idPruu) {
      Swal.fire('Erro', 'ID do Pruu não encontrado!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('fotoDePerfil', this.selectedFile!, this.selectedFile!.name);
    formData.append('idPruu', idPruu);

    this.pruuService.salvarFotoPruu(formData).subscribe({
      next: () => {
        this.voltar();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error.message, 'error');
      },
    });
  }

  // Função para voltar para a tela de listagem
  voltar(): void {
    this.router.navigate(['/pruu']);
  }
}
