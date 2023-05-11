import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecogerEjerciciosService } from '../recoger-ejercicios.service';

@Component({
  selector: 'app-espalda-biceps',
  templateUrl: './espalda-biceps.component.html',
  styleUrls: ['./espalda-biceps.component.css']
})
export class EspaldaBicepsComponent {
  apiLoaded = false;
  cosas:any;
  constructor(private http: HttpClient,private RecogerEjercicioService : RecogerEjerciciosService){}
  ngOnInit(){
    this.RecogerEjercicioService.recogerEspaldaBiceps({}).subscribe((response)=>{
      console.log(response);
      this.cosas = response;
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
