import { Component } from '@angular/core';
import {Router} from '@angular/router';

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
  

  constructor(private router: Router
    // private translate: TranslateService
  ) {

  }
  
}