import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent { //implements OnInit 
  cosas:any;
  prueba:any;
  modalOpen = false;
  isClickedA = false;
  isClickedB = false;
  isClickedC = false;
  isClickedD = false;
  constructor(private http: HttpClient) {}

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
  mostrarSuplementacion(){
    this.http.get('https://localhost:7104/api/productos/listadoSuplementacion').subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    });
  }
  mostrarModa(){
    this.http.get('https://localhost:7104/api/productos/listadoModa').subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    });
  }
  mostrarEquipamiento(){
    this.http.get('https://localhost:7104/api/productos/listadoEquipamiento').subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    });
  }
  mostrarTodo(){
    this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    });
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
  borrarProducto(){
    console.log("a")
  }
}
