import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../model/usuario';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ehAdministrador: boolean = false;

  constructor(private cookieService: CookieService) { }

  isAdmin(): boolean {
    const token = this.cookieService.get('tokenUsuarioAutenticado');
    if (token) {
      const tokenJSON: any = jwtDecode(token);
      return this.ehAdministrador = tokenJSON?.perfil === 'ADMINISTRADOR';
    }
    return this.ehAdministrador = false;
  }

}
