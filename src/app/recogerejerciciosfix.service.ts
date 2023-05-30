import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RecogerejerciciosfixService {

  constructor(private http:HttpClient) { }

  recogerEjercicios(dato: any){
    var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
      datoEjercicio : dato
    }
    return this.http.post('https://localhost:7104/api/ejercicios/RetornarTodo', req);
  }
}
