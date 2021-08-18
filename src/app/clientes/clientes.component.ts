import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DetalleService } from './detalle/detalle.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private detalleService: DetalleService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
      
      this.clienteService.getClientes(page).subscribe(resp => {
        this.clientes = resp.content as Cliente[];
        this.paginador = resp;
      });
    })
    
    
  }

  delete(cliente: Cliente): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(resp => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire(
            'Cliente eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito`,
            'success'
          );
        }); 
      }
    });
  }

  abrirModal(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    this.detalleService.abrirModal();
  }

}
