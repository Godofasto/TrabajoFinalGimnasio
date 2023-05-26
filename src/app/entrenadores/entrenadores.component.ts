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
  isLoading:boolean = true
  productoActualizado = {Nombre: '', Descripcion:'', precioMensual:0, urlImagen:'', horarioHoras:'', horarioDias:'', numeroTelefono:''};
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
      this.isLoading = false;
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

  public editarProducto(id: number, entrenadorActualizado: any) {
    const url = `https://localhost:7104/api/entrenadores/editar/${id}`;
  
    this.http.put(url, entrenadorActualizado).subscribe(
      () => {
        
        console.log('Entrenador actualizado correctamente');
        window.location.reload();
      },
      error => {
        console.error('Error al actualizar el entrenador', error);
        // Maneja el error adecuadamente
      }
    );
  }
  public onEditarClick(cosa: any) {
    //Meter aqui un sweet alert con el formulario para editarlo
    //buscar dialog
    Swal.fire({
      title: 'Editar Entrenador',
      html:
        '<input id="input1" class="swal2-input" placeholder="Nombre" value="' + cosa.nombre + '">' +
        '<input id="input2" class="swal2-input" placeholder="Descripción" value="' + cosa.descripcion + '">' +
        '<input id="input3" class="swal2-input" placeholder="Precio mensual" value="' + cosa.precioMensual + '">' +
        '<input id="input4" class="swal2-input" placeholder="horarioHoras" value="' + cosa.horarioHoras + '">' +
        '<input id="input5" class="swal2-input" placeholder="horarioDias" value="' + cosa.horarioDias + '">' +
        '<input id="input6" class="swal2-input" placeholder="numeroTelefono" value="' + cosa.numeroTelefono + '">' ,
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Seleccionar imagen'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      preConfirm: (file) => {
        if(file){
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = event.target.result;
              resolve(base64);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          });
        }else{
          console.log(cosa);
          return cosa.urlImagen;
        }
        
      }
    }).then((result) => {
      if (result.value) {
        const input1Value = (document.getElementById('input1') as HTMLInputElement).value;
        const input2Value = (document.getElementById('input2') as HTMLInputElement).value;
        const input3Value = (document.getElementById('input3') as HTMLInputElement).value;
        const input4Value = (document.getElementById('input4') as HTMLInputElement).value;
        const input5Value = (document.getElementById('input5') as HTMLInputElement).value;
        const input6Value = (document.getElementById('input6') as HTMLInputElement).value;
        const base64Image = result.value;
        const entrenadorActualizado: any = {
          Id: 1,
          Nombre: input1Value,
          Descripcion: input2Value,
          precioMensual: input3Value,
          urlImagen:base64Image,
          horarioHoras: input4Value,
          horarioDias: input5Value,
          numeroTelefono : input6Value
        };
    
        this.editarProducto(cosa.id, entrenadorActualizado);
      }else{
        if (result.value) {
          const input1Value = (document.getElementById('input1') as HTMLInputElement).value;
          const input2Value = (document.getElementById('input2') as HTMLInputElement).value;
          const input3Value = (document.getElementById('input3') as HTMLInputElement).value;
          const input4Value = (document.getElementById('input4') as HTMLInputElement).value;
          const input5Value = (document.getElementById('input5') as HTMLInputElement).value;
          const input6Value = (document.getElementById('input6') as HTMLInputElement).value;
          var imagenAnterior = this.cosas.urlImagen;
          const entrenadorActualizado: any = {
            Id: 1,
            Nombre: input1Value,
            Descripcion: input2Value,
            precioMensual: input3Value,
            urlImagen:imagenAnterior,
            horarioHoras: input4Value,
            horarioDias: input5Value,
            numeroTelefono : input6Value
          };
      
          this.editarProducto(cosa.id, entrenadorActualizado);
      }
    }});
  
  
  }
  contratarEntrenador(){
    Swal.fire({
      title: 'Si quieres contactar con uno de nuestros entrenadores tienes que llamarle',
      icon:'info',
    })
  }
}
