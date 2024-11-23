import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pruu } from '../model/pruu';
import { Observable } from 'rxjs';
import { PruuSeletor } from '../seletor/pruu.seletor';

@Injectable({
  providedIn: 'root'
})
export class PruuService {
  private readonly API = 'http://localhost:8080/pombo/pruu';

  constructor(private httpClient: HttpClient) { }

  uploadImagem(idPruu: string, formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.API}/${idPruu}/upload`, formData);
  }

  salvar(novoPruu: Pruu): Observable<Pruu> {
    return this.httpClient.post<Pruu>(this.API + '/postar', novoPruu)
  }

  // editar(PruuEditado: Pruu): Observable<boolean> {
  //   return this.httpClient.put<boolean>(this.API + '/editar', PruuEditado)
  // }

  excluir(idPruu: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + idPruu)
  }

  listarTodos(): Observable<Array<Pruu>> {
    return this.httpClient.get<Array<Pruu>>(this.API)
  }
  
  pesquisarPorId(idPruu: number): Observable<Pruu> {
    return this.httpClient.get<Pruu>(this.API + `/${idPruu}`);
  }

  listarComSeletor(seletor: PruuSeletor): Observable<Array<Pruu>> {
    return this.httpClient.post<Array<Pruu>>(this.API + '/filtrar', seletor);
  }

  listarPruusPorUsuario(idUsuario: string): Observable<Array<Pruu>> {
    return this.httpClient.get<Array<Pruu>>(this.API + `/usuario/${idUsuario}`);
  }

  bloquear(idUsuario: string, idPruu: string): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + `/${idPruu}/bloquear/${idUsuario}`, {});
  }
}
