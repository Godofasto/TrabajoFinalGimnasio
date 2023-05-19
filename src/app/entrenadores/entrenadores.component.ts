import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { SubirEntrenadorService } from '../subir-entrenador.service';
import { SubirUsuarioService } from '../subir-usuario.service';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent implements OnInit{
  modalOpen = false;
  permisoAdmin = false;
  cosas:any;
  cosasU:any;
  constructor(private http: HttpClient,private SubirEntrenadoresService : SubirEntrenadorService, private localStoragesService: LocalStorageService, private subirUsuarioService : SubirUsuarioService) {}
  openModal(){
    if(this.modalOpen == false){
      this.modalOpen = true;
    }else{
      this.modalOpen = false
    }
      
  }
  ngOnInit(){
    this.SubirEntrenadoresService.recogerEntrenadores({}).subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    }, (error) => {
      console.error(error);
    });
    console.log(this.permisoAdmin)
    if(this.localStoragesService.isLoggedIn()){
      this.subirUsuarioService.retornarUsuarios({}).subscribe((response)=>{
        console.log(response);
        this.cosasU = response;
        console.log(this.cosasU);
        for(let i = 0; i < this.cosasU.length; i++){
          console.log(this.cosasU[i]);
          if(this.cosasU[i].nombre == this.localStoragesService.username){
            if(this.cosasU[i].perfilId == 1){
              this.permisoAdmin = true;
            }else if(this.cosasU[i].perfilId == 4){
              this.permisoAdmin = false;
            }
          }
       }
      })
      // this.permisoAdmin = true;
    }
  }
  borrarProducto(Id : Number){ //Podria intentar ocultarlos en vez de eliminarlos directamente
    console.log(this.cosas)
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás recuperar este entrenador",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://localhost:7104/api/entrenadores/${Id}`).subscribe(()=>{
        const indice = this.cosas.findIndex(p => p.id === Id);
        this.cosas.splice(indice, 1); //Esto es para que se vea en local el cambio porque recargar la pagina es cutre
    })
        
      }
    })
    
  }
}
