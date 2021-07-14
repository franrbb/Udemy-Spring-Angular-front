import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { _throw as throwError } from 'rxjs/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8081/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page)
    .pipe(
      map( (resp:any) => {
        (resp.content as Cliente[]).map(cliente => {
          return cliente;
        });
        return resp;
      }));
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders})
    .pipe(
        (map((resp:any) => resp.cliente as Cliente)),
        (catchError( e => {

          if(e.status == 400){
            return throwError(e);
          }

          Swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: 'error'
          });
        return throwError(e);
    })));
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    .pipe(catchError( e => {
      this.router.navigate[('/clientes')]
      Swal.fire({
        title: 'Error al recuperar cliente',
        text: e.error.mensaje,
        icon: 'error'
      });
      return throwError(e);
    }));
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(catchError( e => {

      if(e.status == 400){
        return throwError(e);
      }

      Swal.fire({
        title: e.error.mensaje,
        text: e.error.error,
        icon: 'error'
      });
      return throwError(e);
    }));
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
    .pipe(catchError( e => {
      Swal.fire({
        title: e.error.mensaje,
        text: e.error.error,
        icon: 'error'
      });
      return throwError(e);
    }));
  }

}
