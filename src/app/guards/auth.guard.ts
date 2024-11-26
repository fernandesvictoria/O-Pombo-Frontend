import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    const token = localStorage.getItem('tokenUsuarioAutenticado');
    if (token) {
      // se o usuário estiver autenticado mas não for ADMIN, redireciona para outra rota
      this.router.navigate(['/pruu']);
    } else {
      // se não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
    }

    return false; // impede o acesso à rota
  }
}
