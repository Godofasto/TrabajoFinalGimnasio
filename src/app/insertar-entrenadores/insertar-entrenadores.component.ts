import { Component, ViewChild } from '@angular/core';
import { SubirEntrenadorService} from '../subir-entrenador.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-insertar-entrenadores',
  templateUrl: './insertar-entrenadores.component.html',
  styleUrls: ['./insertar-entrenadores.component.css']
})
export class InsertarEntrenadoresComponent {
  miModelo={horarioDias: '', horarioHoras : '', precioMensual:'', numeroTelefono:0, Nombre:'', Descripcion:'', urlImagen:''}

  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirEntrenadorService : SubirEntrenadorService){}

  onSubmit(){
    this.subirEntrenadorService.subirEntrenador(this.miModelo).subscribe(
      (respuesta) =>{
        console.log("Los datos se guardaron correctamente");
        this.miFormularioRef.reset();
        window.location.reload();
      },
      (error) => {
        console.log("No ha funcionado la subida del entrenador")
      }
    )
  }
  convertirImagen(event: any) { //Esto lo pasa a base 64
    const archivo = event.target.files[0];
  
    if (archivo) {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => {
        this.miModelo.urlImagen = lector.result as string;
      };
    }
  }
}
