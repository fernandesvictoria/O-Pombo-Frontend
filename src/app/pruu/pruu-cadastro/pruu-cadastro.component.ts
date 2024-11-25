import { Component } from '@angular/core';
import { Pruu } from '../../shared/model/pruu';
import { PruuService } from '../../shared/service/pruu.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pruu-cadastro',
  standalone: true,
  imports: [],
  templateUrl: './pruu-cadastro.component.html',
  styleUrl: './pruu-cadastro.component.scss'
})
export class PruuCadastroComponent {
  // public pruu: Pruu = new Pruu();
  // public selectedFile: File | null = null;
  // public imagePreview: string | ArrayBuffer | null = null;

  // constructor(
  //   private pruuService: PruuService,
  //   private router: Router,
  // ) { }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file && file.size <= 10 * 1024 * 1024) {
  //     this.selectedFile = file;

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     alert('Imagem muito grande! Selecione uma imagem menor que 10MB.');
  //     this.selectedFile = null;
  //     this.imagePreview = null;
  //   }
  // }

  // inserir(): void {
  //   this.pruuService.salvar(this.pruu).subscribe(
  //     (resposta) => {
  //       Swal.fire('Pruu enviado!', '', 'success');
  //       if (this.selectedFile) {
  //         this.uploadImagem(resposta.id);
  //       } else {
  //         this.voltar();
  //       }
  //       this.voltar();
  //     },
  //     (erro) => {
  //       Swal.fire('Erro ao enviar seu pruu: ' + erro.error, 'error');
  //     }
  //   );
  // }

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
  //     }
  //   });
  // }

  // voltar(): void {
  //   this.router.navigate(['/']); // REVER ROTA
  // }

}
