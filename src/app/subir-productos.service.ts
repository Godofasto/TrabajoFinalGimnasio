import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubirProductosService {

  constructor(private http:HttpClient) { }

  subirProducto(datos : any){
    return this.http.post('https://localhost:7104/api/productos/añadir', datos)
  }
}
