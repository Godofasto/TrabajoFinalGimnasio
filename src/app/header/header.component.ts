import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { SubirUsuarioService } from '../subir-usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  grandeUrl = 'assets/Gym1.jpg'
  logoUrl = 'assets/LogoB.png';
  newLogoUrl = 'assets/NewLogo.png'
  fuenteGold = 'assets/LatinWide.ttf'
  sesionIniciada:boolean = false;
  @ViewChild('botonCuotas') botonCuota: ElementRef;
  constructor(private router: Router, public localStoragesService : LocalStorageService, private subirUsuarioService : SubirUsuarioService) {

  }
  ngOnInit(){
    // console.log("head");
    // // const username = this.localStoragesService.username;
    // // const password = this.localStoragesService.password;
    // if(this.localStoragesService.isLoggedIn()){
    //   this.sesionIniciada = true;
    //   console.log(this.localStoragesService.isLoggedIn());
    //   console.log(this.sesionIniciada);
    //   // this.permisoAdmin = true;
    // }
  }
}