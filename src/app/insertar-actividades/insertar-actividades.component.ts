import { Component, ViewChild } from '@angular/core';
import { SubirActividadesService} from '../subir-actividades.service';
import {Location} from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SubirEntrenadorService } from '../subir-entrenador.service';

@Component({
  selector: 'app-insertar-actividades',
  templateUrl: './insertar-actividades.component.html',
  styleUrls: ['./insertar-actividades.component.css']
})
export class InsertarActividadesComponent {
  miModelo={Nombre:'', Descripcion:'', idEntrenador:''}
  infoSelect:any;
  algo:string;
  infoSelectTotal:string[] = [];
  miFormulario:FormGroup;
  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirActividadesService : SubirActividadesService, private subirEntrenador : SubirEntrenadorService){}

  ngOnInit() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]), ///^[a-zA-Z\s]*$/
      descripcion: new FormControl('', Validators.required),
      idEntrenador: new FormControl('', Validators.required)
    });
    this.subirEntrenador.recogerEntrenadores({}).subscribe((response)=>{
      this.infoSelect = response
      console.log(this.infoSelect)
    for(let i = 0; i < this.infoSelect.length; i++){
      this.algo = this.infoSelect[i].nombre;
      console.log(this.algo);
      this.infoSelectTotal.push(this.algo);
    }
    console.log(this.infoSelectTotal)
    var selectElement = document.getElementById('idEntrenador');
    console.log(selectElement)
    // this.infoSelectTotal.forEach((opcion)=>{
    //   // var optionElement = document.createElement("option");
    //   let optionElement = new Option(opcion, opcion);
    //   console.log(optionElement);
    //   selectElement.add(optionElement);
    // })
    })
  }
  

  onSubmit(){
    if(this.miFormulario.valid){
    this.miModelo.Nombre = this.miFormulario.get('nombre').value;
    this.miModelo.Descripcion = this.miFormulario.get('descripcion').value;
    this.miModelo.idEntrenador = this.miFormulario.get('idEntrenador').value;
    this.subirActividadesService.subirActividad(this.miModelo).subscribe(
      (respuesta) =>{
        console.log("Los datos se guardaron correctamente");
        Swal.fire({
          icon: 'success',
          title: 'La actividad se ha subido correctamente',
        }).then((result) =>{
          if(result.isConfirmed){
            this.miFormulario.reset();
            window.location.reload();
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
