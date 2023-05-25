import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  @ViewChild('cositas', {static: true}) myElement: ElementRef;
  
  primero:boolean = false;
  segundo:boolean = false;
  tercero:boolean = false;
  cuarto:boolean = false;
  puertaAbierta:boolean = false;
  constructor(private localStoragesService : LocalStorageService, private router : Router){}
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
  ngOnInit(){
    
  }
  mouseEvHandler(status){
    console.log(status);
    this.puertaAbierta = status; 
  }
  logout() : void{
    this.localStoragesService.logout();
    this.router.navigate(['/'])
  }
}
