import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PruuService {
  private readonly API = 'http://localhost:8080/pombo/pruu/';

  constructor(private httpClient: HttpClient) { }
}
