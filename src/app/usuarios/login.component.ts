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
      let payload = JSON.parse(atob(resp.access_token.split(".")[1]));
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Login',
        text: `Hola ${payload.user_name}, has iniciado sesión con éxito`,
        icon: 'success'
      });
    })

  }

}
