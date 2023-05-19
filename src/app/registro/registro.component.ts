import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubirUsuarioService } from '../subir-usuario.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  miModelo={nombre:'', email:'', tlf:0, contrasena:'', sexo:'', perfilId : '4'}
  secContrasena : string = '';
  // nombre:string = "";
  // descripcion:string = "";
  // precio:number = 0;
  // urlImagen:string = "";

  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirUsuariosService : SubirUsuarioService){}
  onSubmit(form : NgForm){
    if(form.valid){
      if(this.miModelo.contrasena == this.secContrasena){
        console.log(this.miModelo);
        this.subirUsuariosService.subirUsuario(this.miModelo).subscribe(
          (respuesta)=>{
            Swal.fire({
              icon: 'success',
              title: 'Registro completado!!',
            })
            form.reset();
          },(error : HttpErrorResponse)=>{
            if(error.status === 409){
              Swal.fire({
                icon: 'error',
                title: 'El nombre que intentas ponerte ya esta en uso'
              })
            }else if(error.status === 417){
              Swal.fire({
                icon: 'error',
                title: 'El formato del correo electronico no es valido'
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'No se ha podido enviar',
                text: 'Vuelve a intentarlo en unos minutos'
              })
            }
          }
        )
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'El formulario esta mal rellenado',
        text: 'Vuelve a intentarlo'
      })
    }
    

  }
}
