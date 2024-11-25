import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';
import { UsuarioSeletor } from '../seletor/usuario.seletor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/pombo/usuarios';

  constructor(private httpClient: HttpClient) { }

  atualizar(UsuarioEditado: Usuario): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.API}/atualizar`, UsuarioEditado)
  }

  excluir(idUsuario: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API}/excluir/${idUsuario}`)
  }

  // TODO: ROTA PERMITIDA APENAS PARA ADMINISTRADORES
  pesquisarTodos(): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(`${this.API}/todos`)
  }

  pesquisarPorId(idUsuario: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.API}/${idUsuario}`)
  }

  pesquisarComFiltros(seletor: UsuarioSeletor): Observable<Array<Usuario>> {
    return this.httpClient.post<Array<Usuario>>(`${this.API}/filtrar`, seletor);
  }
}
