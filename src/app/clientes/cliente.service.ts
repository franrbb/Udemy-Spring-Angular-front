import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { _throw as throwError } from 'rxjs/observable/throw';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8081/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean{
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login'])
      return true;
    }

    return false;
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones')
    .pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }
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

          if(this.isNoAutorizado(e)){
            return throwError(e);
          }

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

      if(this.isNoAutorizado(e)){
        return throwError(e);
      }

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

      if(this.isNoAutorizado(e)){
        return throwError(e);
      }

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

      if(this.isNoAutorizado(e)){
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req)
    .pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

}
