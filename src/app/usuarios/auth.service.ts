import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './usuario';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    const urlEndPoint = 'http://localhost:8081/oauth/token';
    const credenciales = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': 'Basic ' + credenciales
    });
    
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

}
