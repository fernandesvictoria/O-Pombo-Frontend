import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { UsuarioSeletor } from '../seletor/usuario.seletor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/pombo/usuario/';

  constructor(private httpClient: HttpClient) { }

  salvar(novoUsuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API + '/salvar', novoUsuario)
  }

  editar(UsuarioEditado: Usuario): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', UsuarioEditado)
  }

  excluir(UsuarioID: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + UsuarioID)
  }

  consultarTodosUsuarios(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API + '/todos')
  }

  listarComSeletor(seletor: UsuarioSeletor): Observable<Array<Usuario>> {
    return this.httpClient.post<Array<Usuario>>(this.API + '/filtrar', seletor);
  }

  consultarUsuarioId(idUsuario: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API + '/consultar/' + idUsuario)
  }  
}
