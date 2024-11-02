import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pruu } from '../model/pruu';
import { Observable } from 'rxjs';
import { PruuSeletor } from '../seletor/pruu.seletor';

@Injectable({
  providedIn: 'root'
})
export class PruuService {
  private readonly API = 'http://localhost:8080/pombo/pruu/';

  constructor(private httpClient: HttpClient) { }

  salvar(novoPruu: Pruu): Observable<Pruu> {
    return this.httpClient.post<Pruu>(this.API + '/salvar', novoPruu)
  }

  editar(PruuEditado: Pruu): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', PruuEditado)
  }

  excluir(PruuID: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + PruuID)
  }

  consultarTodosPruus(): Observable<Array<Pruu>> {
    return this.httpClient.get<Array<Pruu>>(this.API + '/todos')
  }

  listarComSeletor(seletor: PruuSeletor): Observable<Array<Pruu>> {
    return this.httpClient.post<Array<Pruu>>(this.API + '/filtrar', seletor);
  }

  consultarPruuId(idPruu: number): Observable<Pruu> {
    return this.httpClient.get<Pruu>(this.API + '/consultar/' + idPruu)
  }
}
