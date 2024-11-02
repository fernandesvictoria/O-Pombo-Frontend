import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia } from '../model/denuncia';
import { Observable } from 'rxjs';
import { DenunciaSeletor } from '../seletor/denuncia.seletor';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private readonly API = 'http://localhost:8080/pombo/denuncia/';

  constructor(private httpClient: HttpClient) { }

  salvar(novoDenuncia: Denuncia): Observable<Denuncia> {
    return this.httpClient.post<Denuncia>(this.API + '/salvar', novoDenuncia)
  }

  editar(DenunciaEditado: Denuncia): Observable<boolean> {
    return this.httpClient.put<boolean>(this.API + '/alterar', DenunciaEditado)
  }

  excluir(DenunciaID: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.API + '/excluir/' + DenunciaID)
  }

  consultarTodosDenuncias(): Observable<Array<Denuncia>> {
    return this.httpClient.get<Array<Denuncia>>(this.API + '/todos')
  }

  listarComSeletor(seletor: DenunciaSeletor): Observable<Array<Denuncia>> {
    return this.httpClient.post<Array<Denuncia>>(this.API + '/filtrar', seletor);
  }

  consultarDenunciaId(idDenuncia: number): Observable<Denuncia> {
    return this.httpClient.get<Denuncia>(this.API + '/consultar/' + idDenuncia)
  }
}
