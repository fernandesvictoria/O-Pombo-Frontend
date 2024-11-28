import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pruu } from '../model/pruu';
import { Observable } from 'rxjs';
import { PruuSeletor } from '../seletor/pruu.seletor';

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

  excluir(idPruu: string, idUsuario: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API}/excluir/${idPruu}/${idUsuario}`, {})
  }

  pesquisarTodos(): Observable<Array<Pruu>> {
    return this.httpClient.post<Array<Pruu>>(`${this.API}/filtrar`, {});
  }

  pesquisarPorId(idPruu: string): Observable<Pruu> {
    return this.httpClient.get<Pruu>(`${this.API}/${idPruu}`, {});
  }

  pesquisarComFiltro(seletor: PruuSeletor): Observable<Array<Pruu>> {
    return this.httpClient.post<Array<Pruu>>(`${this.API}/filtrar`, seletor);
  }
}
