import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pruu } from '../../shared/model/pruu';
import { PruuService } from '../../shared/service/pruu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pruu-cadastro',
  templateUrl: './pruu-cadastro.component.html',
})
<<<<<<< HEAD
export class PruuCadastroComponent {
  public pruu: Pruu = new Pruu();
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(private pruuService: PruuService, private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Imagem muito grande! Selecione uma imagem menor que 10MB.');
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  inserir(): void {
    this.pruuService.cadastrar(this.pruu).subscribe(
      (resposta) => {
        Swal.fire('Pruu enviado!', '', 'success');
        if (this.selectedFile) {
          // this.uploadImagem(resposta.id);
        } else {
          this.voltar();
        }
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao enviar seu pruu: ' + erro.error, 'error');
      }
    );
  }

  // uploadImagem(pruuId: string): void {
  //   const formData = new FormData();
  //   formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

  //   this.pruuService.uploadImagem(pruuId, formData).subscribe({
  //     next: () => {
  //       Swal.fire('Imagem carregada com sucesso!', '', 'success');
  //       this.voltar();
  //     },
  //     error: (erro) => {
  //       Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
  //     },
  //   });
  // }

  voltar(): void {
    this.router.navigate(['/']); // REVER ROTA
=======
export class PruuCadastroComponent implements OnInit {
  pruu: Pruu = new Pruu();

  constructor(
    private pruuService: PruuService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public cadastrar(): void {
    this.pruuService.cadastrar(this.pruu).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Pruu cadastrado com sucesso!', 'success');
        this.router.navigate(['/pruu']);
      },
      error: erro => {
        Swal.fire('Erro', 'Erro ao cadastrar o Pruu. Tente novamente.', 'error');
        console.error('Erro ao cadastrar Pruu', erro);
      }
    });
  }

  public cancelar(): void {
    this.router.navigate(['/pruu']);
>>>>>>> c0b3e78 (feat: create pruu)
  }
}
