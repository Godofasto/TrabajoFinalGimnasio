import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RecogerEjerciciosService } from '../recoger-ejercicios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pecho-triceps',
  templateUrl: './pecho-triceps.component.html',
  styleUrls: ['./pecho-triceps.component.css']
})
export class PechoTricepsComponent {
  apiLoaded = false;
  cosas:any;
  constructor(private http: HttpClient,private RecogerEjercicioService : RecogerEjerciciosService, public sanitizer : DomSanitizer){}
  ngOnInit(){
    this.RecogerEjercicioService.recogerPechoTriceps({}).subscribe((response: any)=>{
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
