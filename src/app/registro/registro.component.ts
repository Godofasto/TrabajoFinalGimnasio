import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SubirUsuarioService } from '../subir-usuario.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  miModelo={nombre:'', email:'', tlf:NaN, contrasena:'', sexo:'', perfilId : '4'}
  miFormulario : FormGroup;
  @ViewChild('miFormulario') miFormularioRef: any;
  secContrasena : string = '';
  // nombre:string = "";
  // descripcion:string = "";
  // precio:number = 0;
  // urlImagen:string = "";

  constructor(private subirUsuariosService : SubirUsuarioService, private router : Router){}
  ngOnInit(){
    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern(/^[\p{L}\s]*$/u)]), ///^[a-zA-Z\s]*$/
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/)]),
      contrasena: new FormControl('', Validators.required),
      secContrasena: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      tlf: new FormControl('', [Validators.required, Validators.pattern(/^(6|7|8|9)\d{8}$/)])
    });
  }
  onSubmit(){
    if(this.miFormulario.valid){
      this.miModelo.nombre = this.miFormulario.get('nombre').value;
      this.miModelo.email = this.miFormulario.get('email').value;
      this.miModelo.tlf = this.miFormulario.get('tlf').value;
      this.miModelo.contrasena = this.miFormulario.get('contrasena').value;
      this.miModelo.sexo = this.miFormulario.get('sexo').value;
      this.secContrasena = this.miFormulario.get('secContrasena').value;
      if(this.miModelo.contrasena == this.secContrasena){
        console.log(this.miModelo);
        this.subirUsuariosService.subirUsuario(this.miModelo).subscribe(
          (respuesta)=>{
            Swal.fire({
              icon: 'success',
              title: 'Registro completado!!',
            }).then((result)=>{
              if(result.isConfirmed){
                this.router.navigate(['/'])
              }
            })
            this.miFormulario.reset();
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
            }else if(error.status === 406){
              Swal.fire({
                icon: 'error',
                title: 'El número de teléfono no es válido'
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
  validarNumero(){
    if(this.miFormulario.get('tlf').value<0){
      this.miFormulario.get('tlf').patchValue('');
    }
  }
}
