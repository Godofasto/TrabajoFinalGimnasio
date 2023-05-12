import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecogerEjerciciosService } from '../recoger-ejercicios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pierna-hombro',
  templateUrl: './pierna-hombro.component.html',
  styleUrls: ['./pierna-hombro.component.css']
})
export class PiernaHombroComponent {
  apiLoaded = false;
  cosas:any;
  constructor(private http: HttpClient,private RecogerEjercicioService : RecogerEjerciciosService, public sanitizer : DomSanitizer){}
  ngOnInit(){
    this.RecogerEjercicioService.recogerPiernaHombro({}).subscribe((response: any)=>{
      console.log(response);
      this.cosas = response
    }, (error) => {
      console.error(error);
    })
  
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
