import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia, DenunciaDados } from '../model/denuncia';
import { StatusDenuncia } from '../model/enum/status-denuncia';
import { DenunciaSeletor } from '../seletor/denuncia.seletor';

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  private readonly API = 'http://localhost:8080/pombo/denuncias';

  constructor(private httpClient: HttpClient) {}

  cadastrar(novoDenuncia: Denuncia): Observable<Denuncia> {
    return this.httpClient.post<Denuncia>(
      `${this.API}/cadastrar`,
      novoDenuncia
    );
  }

  atualizar(idDenuncia: string, status: StatusDenuncia): Observable<Denuncia> {
    return this.httpClient.put<Denuncia>(
      `${this.API}/atualizar/${idDenuncia}`,
      status.toString
    );
  }

  excluir(idDenuncia: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API}/excluir/${idDenuncia}`);
  }

  pesquisarTodas(): Observable<Array<DenunciaDados>> {
    return this.httpClient.get<Array<DenunciaDados>>(`${this.API}/todas`);
  }

  pesquisarPorId(idDenuncia: string): Observable<DenunciaDados> {
    return this.httpClient.get<DenunciaDados>(this.API + `/${idDenuncia}`);
  }

  pesquisarComFiltros(seletor: DenunciaSeletor): Observable<Array<Denuncia>> {
    return this.httpClient.post<Array<Denuncia>>(
      `${this.API}/filtrar`,
      seletor
    );
  }
}
