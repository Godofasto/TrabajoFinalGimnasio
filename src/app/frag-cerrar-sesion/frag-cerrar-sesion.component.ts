import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-frag-cerrar-sesion',
  templateUrl: './frag-cerrar-sesion.component.html',
  styleUrls: ['./frag-cerrar-sesion.component.css']
})
export class FragCerrarSesionComponent {
  constructor(private localStoragesService : LocalStorageService, private router : Router){

  }
  logout() : void{
    this.localStoragesService.logout();
    this.router.navigate(['/'])
  }
}
