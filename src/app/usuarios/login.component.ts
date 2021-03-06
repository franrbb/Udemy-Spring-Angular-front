import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = "Ingrese sus credenciales";
  usuario: Usuario;

  constructor(private _authService: AuthService, private router: Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this._authService.isAuthenticated){
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Login',
        text: `Hola ${this._authService.usuario.username}, ya estás autenticado`,
        icon: 'info'
      });
    }
  }

  login(){
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire({
        title: 'Error login',
        text: 'Username o password vacíos',
        icon: 'error'
      });
      return;
    }

    this._authService.login(this.usuario).subscribe( resp => {
      console.log(resp);

      this._authService.guardarUsuario(resp.access_token);
      this._authService.guardarToken(resp.access_token);
      let usuario = this._authService.usuario;

      console.log(usuario.username);

      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Login',
        text: `Hola ${usuario.username}, has iniciado sesión con éxito`,
        icon: 'success'
      });
    }, err => {
      if(err.status == 400){
        Swal.fire({
          title: 'Error login',
          text: 'Usuario o claves incorrectas',
          icon: 'error'
        });
      }
    }
    )

  }

}
