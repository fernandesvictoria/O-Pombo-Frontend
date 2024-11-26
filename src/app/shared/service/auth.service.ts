import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ehAdministrador: boolean = false;

  constructor() {
    this.isAdmin();
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('tokenUsuarioAutenticado');
    if (token) {
      const tokenJSON: any = jwtDecode(token);
      return this.ehAdministrador = tokenJSON?.roles === 'ADMINISTRADOR';
    }
    return this.ehAdministrador = false;
  }
}