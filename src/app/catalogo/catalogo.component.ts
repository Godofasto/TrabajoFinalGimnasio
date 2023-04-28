import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  cosas:any;
  prueba:any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7104/api/productos/listado').subscribe((response)=>{
      console.log(response);
      this.cosas = response;
    });
    //Ver como se supone que tengo que quitar las comillas
  }

}
