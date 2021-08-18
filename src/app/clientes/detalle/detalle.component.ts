import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { DetalleService } from './detalle.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  fotoSeleccionada: File;
  titulo: string = 'Detalle del cliente';
  progreso: number = 0;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private detalleService: DetalleService) { }

  ngOnInit() {}

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire({
        title: 'Error al seleccionar la imagen',
        text: 'El archivo de ser de tipo imagen',
        icon: 'error'
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){
      Swal.fire({
        title: 'Error',
        text: `Debe seleccionar una foto`,
        icon: 'error'
      });
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe( event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total)*100);
        }else if(event.type === HttpEventType.Response){
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          Swal.fire({
            title: 'La foto se ha subido correctamente',
            text: `La foto ${this.cliente.foto} se ha subido con éxito`,
            icon: 'success'
          });
        }
    })
    }
  }

  cerrarModal(){
    this.detalleService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
