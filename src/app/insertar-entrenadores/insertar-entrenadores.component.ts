import { Component, ViewChild } from '@angular/core';
import { SubirEntrenadorService} from '../subir-entrenador.service';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-entrenadores',
  templateUrl: './insertar-entrenadores.component.html',
  styleUrls: ['./insertar-entrenadores.component.css']
})
export class InsertarEntrenadoresComponent {
  miModelo={horarioDias: '', horarioHoras : '', precioMensual:'', numeroTelefono:0, Nombre:'', Descripcion:'', urlImagen:''}
  miFormulario:FormGroup;
  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirEntrenadorService : SubirEntrenadorService){}

  ngOnInit() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]), ///^[a-zA-Z\s]*$/
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.pattern(/^(?!0)\d{2,3}$/)]),
      horarioDias: new FormControl('', [Validators.required, Validators.pattern(/^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)-(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)$/)]),
      horarioHoras: new FormControl('', [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
      imagen: new FormControl('', Validators.required)
    });
  }
  

  onSubmit(){
    if(this.miFormulario.valid){
    this.miModelo.Nombre = this.miFormulario.get('nombre').value;
    this.miModelo.Descripcion = this.miFormulario.get('descripcion').value;
    this.miModelo.precioMensual = this.miFormulario.get('precio').value;
    this.miModelo.horarioDias = this.miFormulario.get('horarioDias').value;
    this.miModelo.horarioHoras = this.miFormulario.get('horarioHoras').value;
    this.miModelo.numeroTelefono = this.miFormulario.get('telefono').value;
    this.subirEntrenadorService.subirEntrenador(this.miModelo).subscribe(
      (respuesta) =>{
        console.log("Los datos se guardaron correctamente");
        Swal.fire({
          icon: 'success',
          title: 'El entrenador se ha subido correctamente',
        }).then((result) =>{
          if(result.isConfirmed){
            this.miFormulario.reset();
        window.location.reload();
          }
        })
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hay algun error en el formulario, revisa bien',
        })
      }
    )
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Hay algun error en el formulario, revisa bien',
    })
  }}
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
