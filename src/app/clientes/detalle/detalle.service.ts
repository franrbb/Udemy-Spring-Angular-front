import { Injectable } from '@angular/core';

@Injectable()
export class DetalleService {

  modal: boolean = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }

}
