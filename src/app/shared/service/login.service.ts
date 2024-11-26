import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario-dto';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8080/pombo/auth';

  constructor(private httpCliente: HttpClient) { }

  autenticar(dto: UsuarioDTO): Observable<HttpResponse<string>> {
    const authHeader = 'Basic ' + btoa(`${dto.login}:${dto.senha}`);
    const headers = new HttpHeaders({
      'authorization': authHeader
    });

    return this.httpCliente.post<string>(`${this.API}/login`, dto, {
      headers,
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  cadastrar(usuario: Usuario): Observable<any> {
    return this.httpCliente.post<any>(`${this.API}/novo`, usuario);
  }

  // COLOCAR NO NAVBAR PRA DESLOGAR
  sair() {
    localStorage.removeItem('tokenUsuarioAutenticado');
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('tokenUsuarioAutenticado');
    return !!token;
  }
}