import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  titulo: string = 'Crear cliente';
  errores: String[];

  constructor(private _clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  create(): void {
    this._clienteService.create(this.cliente)
    .subscribe(
        resp => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            title: 'Nuevo cliente',
            text: `El cliente ${resp.email} ha sido creado con éxito`,
            icon: 'success'
          });
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log("Código de error desde el backend: " + err.status);
          console.log(this.errores);
        }
      );
    console.log(this.cliente);
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if(id){
        this._clienteService.getCliente(id).subscribe( (cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  update(): void{
    this._clienteService.update(this.cliente)
    .subscribe(
      resp => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: 'Cliente actualizado',
          text: `${resp.mensaje}: ${resp.cliente.email}`,
          icon: 'success'
        });
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log("Código de error desde el backend: " + err.status);
      }
    );
  }

}
