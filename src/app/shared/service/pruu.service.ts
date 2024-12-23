import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pruu } from '../model/pruu';
import { Observable } from 'rxjs';
import { PruuSeletor } from '../seletor/pruu.seletor';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PruuService {
  private readonly API = 'http://localhost:8080/pombo/pruus';

  constructor(private httpClient: HttpClient) { }

  cadastrar(novoPruu: Pruu): Observable<Pruu> {
    return this.httpClient.post<Pruu>(`${this.API}/cadastrar`, novoPruu)
  }

  salvarFotoPruu(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API}/salvar-foto`, formData);
  }

  curtir(idPruu: string): Observable<Pruu> {
    return this.httpClient.post<Pruu>(`${this.API}/curtir/${idPruu}`, {})
  }

  excluir(idPruu: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API}/excluir/${idPruu}`, {})
  }

  pesquisarTodos(): Observable<Array<Pruu>> {
    return this.httpClient.get<Array<Pruu>>(`${this.API}/todos`);
  }

  pesquisarPorId(idPruu: string): Observable<Pruu> {
    return this.httpClient.get<Pruu>(`${this.API}/${idPruu}`, {});
  }

  pesquisarComFiltro(seletor: PruuSeletor): Observable<Array<Pruu>> {
    return this.httpClient.post<Array<Pruu>>(`${this.API}/filtrar`, seletor);
  }

  pesquisarUsuariosQueCurtiram(idPruu: string): Observable<Array<Usuario>> {
    return this.httpClient.get<Array<Usuario>>(`${this.API}/usuarios-que-curtiram/${idPruu}`);
  }

  pesquisarPruusCurtidosPeloUsuario(idUsuario: string): Observable<Array<Pruu>> {
    return this.httpClient.get<Array<Pruu>>(`${this.API}/meus-likes/${idUsuario}`);
  }

  contarPaginas(seletor: PruuSeletor): Observable<number> {
    return this.httpClient.post<number>(this.API + '/total-paginas', seletor);
  }

}
