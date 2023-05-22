import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { SubirUsuarioService } from '../subir-usuario.service';

@Component({
  selector: 'app-frag-mis-datos',
  templateUrl: './frag-mis-datos.component.html',
  styleUrls: ['./frag-mis-datos.component.css']
})
export class FragMisDatosComponent {
  constructor (private subirUsuarioService : SubirUsuarioService, private localStorageService : LocalStorageService) {}

  miModelo={nombre: '', email:'', tlf:0, contrasena:'', sexo:''}
  nombreLocal = '';
  contrasenaOculta:string = '';
  cosa:any;
  
  ngOnInit(){
    this.nombreLocal = this.localStorageService.username;
    console.log(this.nombreLocal);
    this.subirUsuarioService.retornarUsuarios({}).subscribe((response)=>{
      this.cosa = response;
      console.log(this.cosa);
      for(let i = 0; i < this.cosa.length; i++){
        if(this.cosa[i].nombre == this.nombreLocal){
          this.miModelo.nombre = this.cosa[i].nombre;
          this.miModelo.email = this.cosa[i].email;
          this.miModelo.tlf = this.cosa[i].tlf;
          this.miModelo.contrasena = this.cosa[i].contrasena;
          this.miModelo.sexo = this.cosa[i].sexo;
          this.contrasenaOculta = '*'.repeat(this.miModelo.contrasena.length);
        }
      }
    })
  }
}
