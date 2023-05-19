import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { SubirUsuarioService } from '../subir-usuario.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {
  miModelo={nombre:'', email:'', tlf:0, contrasena:'', sexo:''}
  @ViewChild('miFormulario') miFormularioRef: any;
  constructor(private subirUsuariosService : SubirUsuarioService, private localStoragesService : LocalStorageService, private router : Router){}
  onSubmit(form : NgForm){
    if(form.valid){
      this.subirUsuariosService.comprobarUsuario(this.miModelo).subscribe(
        (respuesta)=>{
          Swal.fire({
            icon: 'success',
            title: 'Sesión iniciada correctamente'
          }).then((result)=>{
            this.localStoragesService.username = this.miModelo.nombre;
            this.localStoragesService.password = this.miModelo.contrasena;
            if(result.isConfirmed){
              console.log(this.localStoragesService.username);
              console.log(this.localStoragesService.isLoggedIn());
              this.router.navigate(['/perfil'])
            }
          })
          
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Con esos datos no puedes iniciar sesión',
          })
        }
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'El formulario esta mal rellenado',
        text: 'Vuelve a intentarlo'
      })
    }
  }
  ngOnInit(){
    if(this.localStoragesService.isLoggedIn()){
      this.router.navigate(['/perfil'])
    }
  }
}
