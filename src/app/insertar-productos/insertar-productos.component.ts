import { Component, ViewChild,OnInit } from '@angular/core';
import { SubirProductosService } from '../subir-productos.service';
import {Location} from '@angular/common';
import { FormsModule, PatternValidator, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-insertar-productos',
  templateUrl: './insertar-productos.component.html',
  styleUrls: ['./insertar-productos.component.css']
})
export class InsertarProductosComponent implements OnInit{
  miModelo={nombre: '', descripcion:'', precio:0, urlImagen:'', tipo:''}
  miFormulario:FormGroup;
  // nombre:string = "";
  // descripcion:string = "";
  // precio:number = 0;
  // urlImagen:string = "";

  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirproductoService : SubirProductosService){}

  ngOnInit() {
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}$/)]),
      tipo: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required)  //TENGO QUE DESCRUBIR POR QUE ESTAS VALIDACIONES VAN RARAS!!!!!!!!!!!!! 
    });                                                 //Y PONER MEJOR LOS PLACEHOLDERS DEL DE ARTICULOS PARA QUE EL USUARIO SEPA QUE PONER!!!!!!!!!!!!
  }
   onSubmit(){
    if(this.miFormulario.valid){
    this.miModelo.nombre = this.miFormulario.get('nombre').value;
    this.miModelo.descripcion = this.miFormulario.get('descripcion').value;
    this.miModelo.precio = this.miFormulario.get('precio').value;
    this.miModelo.tipo = this.miFormulario.get('tipo').value;
     this.subirproductoService.subirProducto(this.miModelo).subscribe(
       (respuesta) =>{
         console.log("Los datos se guardaron correctamente");
         this.miFormulario.reset();
         window.location.reload();
       },
       (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hay algun error en el formulario, revisa bien',
        })
       }
     )
   }
  }
   convertirImagen(event: any) { //Esto lo pasa a base 64
    debugger;
    console.log(event);
    const archivo = event.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => {
        console.log(lector.result)
        this.miModelo.urlImagen = lector.result as string;
      };
    }
  }
}
