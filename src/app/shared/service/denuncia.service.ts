import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Denuncia } from '../model/denuncia';
import { Observable } from 'rxjs';
import { DenunciaSeletor } from '../seletor/denuncia.seletor';

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {
  private readonly API = 'http://localhost:8080/pombo/denuncias';

  constructor(private httpClient: HttpClient) { }

  salvar(novoDenuncia: Denuncia): Observable<Denuncia> {
    return this.httpClient.post<Denuncia>(this.API + '/denunciar', novoDenuncia)
  }

  listarTodas(): Observable<Array<Denuncia>> {
    return this.httpClient.get<Array<Denuncia>>(this.API);  
  }

  pesquisarPorId(idDenuncia: number): Observable<Denuncia> {
    return this.httpClient.get<Denuncia>(this.API + `/${idDenuncia}`);
  }

  denunciar(denuncia: Denuncia): Observable<any> {
    return this.httpClient.post<any>(this.API, denuncia);
  }
}
