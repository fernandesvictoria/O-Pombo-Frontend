import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  public UsuarioAutenticado: Usuario | undefined;
  public isAdmin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('tokenUsuarioAutenticado');

    if (token) {
      // Converte a String para o formato JSON
      let tokenJSON: any = jwtDecode(token);
      this.isAdmin = tokenJSON?.roles == 'ADMINISTRADOR';

      if (this.isAdmin) {
        this.router.navigate(['/pruus']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('tokenUsuarioAutenticado');
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    this.usuarioAdmin = this.service.isAdmin();
    return this.usuarioAdmin;
  }
}



