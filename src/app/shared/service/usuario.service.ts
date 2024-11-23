import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioSeletor } from '../seletor/usuario.seletor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/pombo/usuario/';

  constructor(private httpClient: HttpClient) { }

  curtir(idUsuario: string, idPruu: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API}/${idUsuario}/curtir/${idPruu}`, {});
  }

  editar(UsuarioEditado: Usuario): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', UsuarioEditado)
  }

  excluir(UsuarioID: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + UsuarioID)
  }

  listarTodos(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API + '/todos')
  }

  listarPorId(idUsuario: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.API + '/consultar/' + idUsuario)
  }

  listarComSeletor(seletor: UsuarioSeletor): Observable<Array<Usuario>> {
    return this.httpClient.post<Array<Usuario>>(this.API + '/filtrar', seletor);
  }

  listarUsuariosQueCurtiramPruu(idPruu: number): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(this.API + `/${idPruu}/curtidas/`)
  }
}
