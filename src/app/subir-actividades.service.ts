import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubirActividadesService {

  constructor(private http:HttpClient) { }

  subirActividad(datos : any){
    return this.http.post('https://localhost:7104/api/actividades/SubirActividades', datos);
  }
  recogerActividades(dato: any){
    // var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
    //   TipoDato : dato
    // }
    return this.http.post('https://localhost:7104/api/actividades/RetornarTodasActividades', {});
  }
  recogerActividadesConEntrenadores(dato:any){
    return this.http.post('https://localhost:7104/api/actividadesEntrenador/RetornarTodo', {})
  }
}
