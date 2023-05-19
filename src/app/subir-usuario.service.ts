import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubirUsuarioService {

  constructor(private http:HttpClient) { }
  subirUsuario(datos : any){
    return this.http.post('https://localhost:7104/api/usuarios/añadir', datos);
  }
  comprobarUsuario(datos : any){
    return this.http.post('https://localhost:7104/api/usuarios/comprobar', datos)
  }
  retornarUsuarios(datos : any){
    return this.http.post('https://localhost:7104/api/usuarios/Recoger', datos)
  }
}
