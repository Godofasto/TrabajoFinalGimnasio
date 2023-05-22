import { Component, ViewChild } from '@angular/core';
import { SubirActividadesService} from '../subir-actividades.service';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insertar-actividades',
  templateUrl: './insertar-actividades.component.html',
  styleUrls: ['./insertar-actividades.component.css']
})
export class InsertarActividadesComponent {
  miModelo={Nombre:'', Descripcion:''}
  miFormulario:FormGroup;
  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirActividadesService : SubirActividadesService){}

  ngOnInit() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]), ///^[a-zA-Z\s]*$/
      descripcion: new FormControl('', Validators.required)
    });
  }
  

  onSubmit(){
    if(this.miFormulario.valid){
    this.miModelo.Nombre = this.miFormulario.get('nombre').value;
    this.miModelo.Descripcion = this.miFormulario.get('descripcion').value;
    this.subirActividadesService.subirActividad(this.miModelo).subscribe(
      (respuesta) =>{
        console.log("Los datos se guardaron correctamente");
        Swal.fire({
          icon: 'success',
          title: 'La actividad se ha subido correctamente',
        }).then((result) =>{
          if(result.isConfirmed){
            this.miFormulario.reset();
        // window.location.reload();
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
}
