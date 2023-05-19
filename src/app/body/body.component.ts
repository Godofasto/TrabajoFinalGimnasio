import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  grandeUrl = 'assets/Gym1.jpg'
  logoUrl = 'assets/LogoB.png';
  constructor(private localStoragesService : LocalStorageService){}
  ngOnInit(){
    console.log(this.localStoragesService.isLoggedIn());
  }
}
