import { Component, ViewChild } from '@angular/core';
import { SubirProductosService } from '../subir-productos.service';



@Component({
  selector: 'app-insertar-productos',
  templateUrl: './insertar-productos.component.html',
  styleUrls: ['./insertar-productos.component.css']
})
export class InsertarProductosComponent {
  miModelo={nombre: '', descripcion:'', precio:0, urlImagen:'', tipo:''}

  // nombre:string = "";
  // descripcion:string = "";
  // precio:number = 0;
  // urlImagen:string = "";

  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirproductoService : SubirProductosService){}


   onSubmit(){
     this.subirproductoService.subirProducto(this.miModelo).subscribe(
       (respuesta) =>{
         console.log("Los datos se guardaron correctamente");
         this.miFormularioRef.reset();
       },
       (error) => {
         console.log("No ha funcionado la subida del producto")
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
