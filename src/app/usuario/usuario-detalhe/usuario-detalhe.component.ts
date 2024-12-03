import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class UsuarioDetalheComponent implements OnInit {
  public usuario: Usuario = new Usuario();
  mensagemErro: string = '';
  carregando: boolean = false;
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('tokenUsuarioAutenticado');
    const tokenJSON: any = jwtDecode(token!);
    this.carregarUsuario(tokenJSON.idUsuario);
    // this.carregarUsuarioAutenticado();
  }

  //nosso
  // editar(): void {
  //   if (!this.usuario || !this.usuario.id) {
  //     this.mensagemErro = 'Usuário inválido. Verifique os dados.';
  //     return;
  //   }

  //   this.usuarioService.atualizar(this.usuario).subscribe({
  //     next: (resultado) => {
  //       if (resultado) {
  //         alert('Usuário atualizado com sucesso!');
  //         this.router.navigate(['/usuarios']); // Redireciona para a lista de usuários ou outra página
  //       } else {
  //         this.mensagemErro = 'Falha ao atualizar o usuário. Tente novamente.';
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Erro ao atualizar usuário:', err);
  //       this.mensagemErro = 'Ocorreu um erro. Tente novamente mais tarde.';
  //     },
  //   });
  // }

  atualizar(): void {
    this.usuarioService.atualizar(this.usuario).subscribe(
      (resposta) => {
        Swal.fire('Usuário atualizada com sucesso!', '', 'success');
        // Após atualizar usuario, verificamos se há uma imagem para ser enviada
        if (this.selectedFile) {
          this.uploadImagem(resposta.id); // Faz o upload da imagem
        } else {
          this.voltar(); // Caso não haja imagem, retornamos
        }
      },
      (erro) => {
        Swal.fire('Erro ao atualizar a carta: ' + erro.error, 'error');
      }
    );
  }

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
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }

  uploadImagem(idUsuario: string): void {
    const formData = new FormData();
    formData.append(
      'fotoDePerfil',
      this.selectedFile!,
      this.selectedFile!.name
    );

    this.usuarioService.salvarFotoDePerfil(formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
        this.voltar();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      },
    });
  }

  carregarUsuario(idUsuario: string): void {
    this.carregando = true;
    this.usuarioService.pesquisarPorId(idUsuario).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.usuario.senha = '';
        this.carregando = false;
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao carregar os detalhes do usuário.';
        console.error(erro);
        this.carregando = false;
      },
    });
  }
  // public carregarUsuarioAutenticado(): void {
  //   console.log(this.usuarioService.buscarUsuarioAutenticado())
  //   this.usuarioService.buscarUsuarioAutenticado().subscribe({
  //     next: (usuario) => {
  //       this.usuario = usuario;
  //     },
  //     error: (erro) => {
  //       console.error('Erro ao carregar usuário autenticado:', erro);
  //       Swal.fire(
  //         'Erro!',
  //         'Não foi possível carregar os dados do usuário.',
  //         'error'
  //       );
  //     },
  //   });
  // }

  voltar(): void {
    this.router.navigate(['/pruu']);
  }
}
