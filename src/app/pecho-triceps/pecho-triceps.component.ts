import { Component } from '@angular/core';
import { EmbedVideo, EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-pecho-triceps',
  templateUrl: './pecho-triceps.component.html',
  styleUrls: ['./pecho-triceps.component.css']
})
export class PechoTricepsComponent {
  constructor(public embedService: EmbedVideoService) {}
}
