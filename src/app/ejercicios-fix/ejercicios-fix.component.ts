import { Component } from '@angular/core';
import { RecogerejerciciosfixService} from '../recogerejerciciosfix.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-ejercicios-fix',
  templateUrl: './ejercicios-fix.component.html',
  styleUrls: ['./ejercicios-fix.component.css']
})
export class EjerciciosFixComponent {
  cosas:any;
  constructor(private recogerejerciciosfix : RecogerejerciciosfixService,public sanitizer : DomSanitizer){}
  mostrarRedux(dat){
    this.recogerejerciciosfix.recogerEjercicios(dat).subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    }, (error) => {
      console.error(error);
    })
  }
}
