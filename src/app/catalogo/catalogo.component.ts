import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import { SubirProductosService } from '../subir-productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{ //implements OnInit 
  miModelo={nombre: '', descripcion:'', precio:0, urlImagen:'', tipo:''}
  cosas:any;
  prueba:any;
  modalOpen = false;
  isClickedA = false;
  isClickedB = false;
  isClickedC = false;
  isClickedD = true;
  constructor(private http: HttpClient, private location:Location,private subirproductoService : SubirProductosService) {}

  // ngOnInit(): void {
  //   this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
    
  //   //Ver como se supone que tengo que quitar las comillas -> Se quitan quitando el |JSON
  // }
  openModal(){
    if(this.modalOpen == false){
      this.modalOpen = true;
    }else{
      this.modalOpen = false
    }
      
  }
  // mostrarSuplementacion(){
  //   this.http.get('https://localhost:7104/api/productos/listadoSuplementacion').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarModa(){
  //   this.http.get('https://localhost:7104/api/productos/listadoModa').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarEquipamiento(){
  //   this.http.get('https://localhost:7104/api/productos/listadoEquipamiento').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  // mostrarTodo(){
  //   this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
  //     console.log(response);
  //     this.cosas = response;
  //   });
  // }
  mostrarRedux(dat){
    this.subirproductoService.recogerProductos(dat).subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    }, (error) => {
      console.error(error);
    })
  }
  ngOnInit(){
    this.mostrarRedux('');
  }
  toggleClickedA(){
    this.isClickedA = !this.isClickedA;
    this.isClickedB = false;
    this.isClickedC = false;
    this.isClickedD = false;
  }
  toggleClickedB(){
    this.isClickedB = !this.isClickedB;
    this.isClickedA = false;
    this.isClickedC = false;
    this.isClickedD = false;
  }
  toggleClickedC(){
    this.isClickedC = !this.isClickedC;
    this.isClickedA = false;
    this.isClickedB = false;
    this.isClickedD = false;
  }
  toggleClickedD(){
    this.isClickedD = !this.isClickedD;
    this.isClickedA = false;
    this.isClickedB = false;
    this.isClickedC = false;
  }
  borrarProducto(Id : Number){ //Podria intentar ocultarlos en vez de eliminarlos directamente
    console.log(this.cosas)
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás recuperar este producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`https://localhost:7104/api/productos/${Id}`).subscribe(()=>{
        const indice = this.cosas.findIndex(p => p.id === Id);
        this.cosas.splice(indice, 1); //Esto es para que se vea en local el cambio porque recargar la pagina es cutre
    })
        
      }
    })
    
  }
}
