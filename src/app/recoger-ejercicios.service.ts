import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class RecogerEjerciciosService {

  constructor(private http:HttpClient) { }

  recogerEspaldaBiceps(dato: any){
    // var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
    //   TipoDato : dato
    // }
    return this.http.post('https://localhost:7104/api/Ejercicios/EspaldaBiceps/RetornarEspaldaBiceps', {});
  }
  recogerPechoTriceps(dato: any){
    // var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
    //   TipoDato : dato
    // }
    return this.http.post('https://localhost:7104/api/Ejercicios/PechoTriceps/RetornarPechoTriceps', {});
  }
  recogerPiernaHombro(dato: any){
    // var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
    //   TipoDato : dato
    // }
    return this.http.post('https://localhost:7104/api/Ejercicios/PiernaHombro/RetornarPiernaHombro', {});
  }
  subirEspaldaBiceps(){}
  subirPechoTriceps(){}
  subirPiernaHombro(){}
}
