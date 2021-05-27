import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8081/api/clientes';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

}
