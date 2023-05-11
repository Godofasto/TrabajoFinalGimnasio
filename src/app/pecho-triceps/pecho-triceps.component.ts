import { Component} from '@angular/core';

@Component({
  selector: 'app-pecho-triceps',
  templateUrl: './pecho-triceps.component.html',
  styleUrls: ['./pecho-triceps.component.css']
})
export class PechoTricepsComponent {
  apiLoaded = false;

  
  ngOnInit(){
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
  
}
