import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  fotoSeleccionada: File;
  titulo: string = 'Detalle del cliente';

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let id:number = +params.get('id');

      if(id){
        this.clienteService.getCliente(id).subscribe( cliente => {
          this.cliente = cliente;
        });
      }
    });
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto(){
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe( resp => {
      this.cliente = resp;
      /*Swal.fire({
        title: 'La foto se ha subido correctamente',
        text: `La foto ${this.cliente.foto} se ha subido con éxito`,
        icon: 'success'
      });*/
    })
  }

}
