import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';

import { ResponsePageable } from '../model/responsePageable.model';

@Injectable({
  providedIn: 'root'
})
export class LiveService {

  apiUrl = "http://localhost:8080/lives";

  // Utilizado para requisições POST
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  // Observable (retorno): funcionalidade da biblioteca rgjs (já instalada ao criar
  // uma aplicação Angular). Próprio para trabalhar com transição de dados assíncrona
  // (por trabalhar com requisição de dados a uma API externa, faz-se necessário o uso de
  // requisições assíncronas). Quando os dados estiverem prontos, haverá um observable
  // para receber esses dados e será executado o que foi definido no subscriable.

  public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }

  // Método público usado para salvar uma live (recebida como parâmetro de entrada)
  // no banco de dados. Retornará um Observable<Live>
  public postLives(live: any): Observable<Live> {
    return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions);
  }
}
