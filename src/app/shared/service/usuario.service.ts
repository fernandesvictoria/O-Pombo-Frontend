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

  // atualizar(UsuarioEditado: Usuario): Observable<Usuario> {
  //   return this.httpClient.put<Usuario>(`${this.API}/atualizar`, UsuarioEditado)
  // }

  atualizar(usuarioEditado: Usuario): Observable<any> {
    return this.httpClient.put(`${this.API}/atualizar`, usuarioEditado);
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

  buscarUsuarioAutenticado(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.API}/usuario-autenticado`);
  }
  //aq

  pesquisarComFiltros(seletor: UsuarioSeletor): Observable<Array<Usuario>> {
    return this.httpClient.post<Array<Usuario>>(`${this.API}/filtrar`, seletor);
  }

  salvarFotoDePerfil(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API}/salvar-foto`, formData);
  }

}
