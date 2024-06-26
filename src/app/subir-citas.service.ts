import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubirCitasService {

  constructor(private http:HttpClient) { }

  subirCitas(datos : any){
    return this.http.post('https://localhost:7104/api/citas/SubirCitas', datos);
  }
  recogerCitas(dato: any){
    var req ={ //Muy importante que el atributo se llame igual aqui que en el .NET, antes no eran TipoDato los dos y fallaba
      UsuariosId : dato
    }
    return this.http.post('https://localhost:7104/api/citas/RetornarTodasCitas', req);
  }
}
