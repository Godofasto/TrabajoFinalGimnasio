import { Component } from '@angular/core';

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
  

  constructor(
    // private translate: TranslateService
  ) {

  }
}
