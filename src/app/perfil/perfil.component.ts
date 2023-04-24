import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  primero:boolean = false;
  segundo:boolean = false;
  tercero:boolean = false;
  cuarto:boolean = false;
  activarprimero(){
    if(this.primero === false){
      this.primero = true;
      this.segundo = false;
      this.tercero = false;
      this.cuarto = false;
  }
}
  activarsegundo(){
    if(this.segundo === false){
      this.segundo = true;
      this.primero = false;
      this.tercero = false;
      this.cuarto = false;
  }
}
  activartercero(){
    if(this.tercero === false){
      this.tercero = true;
      this.primero = false;
      this.segundo = false;
      this.cuarto = false;
    }
  }
  activarcuarto(){
    if(this.cuarto === false){
      this.cuarto = true;
      this.primero = false;
      this.segundo = false;
      this.tercero= false;
    }
  }
}
