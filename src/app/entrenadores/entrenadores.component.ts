import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubirEntrenadorService } from '../subir-entrenador.service';

@Component({
  selector: 'app-entrenadores',
  templateUrl: './entrenadores.component.html',
  styleUrls: ['./entrenadores.component.css']
})
export class EntrenadoresComponent implements OnInit{
  modalOpen = false;
  cosas:any;
  constructor(private http: HttpClient,private SubirEntrenadoresService : SubirEntrenadorService) {}
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
    })
  }
}
