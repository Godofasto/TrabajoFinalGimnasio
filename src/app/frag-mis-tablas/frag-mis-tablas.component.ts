import { Component } from '@angular/core';

@Component({
  selector: 'app-frag-mis-tablas',
  templateUrl: './frag-mis-tablas.component.html',
  styleUrls: ['./frag-mis-tablas.component.css']
})
export class FragMisTablasComponent {
  primero:boolean = false;
  segundo:boolean = false;
  tercero:boolean = false;

  activarPrimero(){
    if(this.primero == false){
      this.primero = true;
      this.segundo = false;
      this.tercero = false;
    }
  }
  activarSegundo(){
    if(this.segundo == false){
      this.segundo = true;
      this.primero = false;
      this.tercero = false;
    }
  }
  activarTercero(){
    if(this.tercero == false){
      this.tercero = true;
      this.primero = false;
      this.segundo = false;
    }
  }

}
