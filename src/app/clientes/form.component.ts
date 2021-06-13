import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
  }

  create(): void {
    this._clienteService.create(this.cliente).subscribe( resp => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: 'Nuevo cliente',
        text: `Cliente ${resp.nombre} creado con éxito`,
        icon: 'success'
      })
    });
    console.log(this.cliente);
  }

}
