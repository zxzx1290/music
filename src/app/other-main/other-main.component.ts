import { Component, OnInit, Input } from '@angular/core';

import { PlayBackService } from '../play-back.service';

@Component({
  selector: 'app-other-main',
  templateUrl: './other-main.component.html',
  styleUrls: ['./other-main.component.scss']
})
export class OtherMainComponent implements OnInit {

  @Input()
  fontColor

  volume = 1;

  constructor(private playBack: PlayBackService) { }

  ngOnInit() {
    this.playBack.onVolumeChange.subscribe(volume => {
      this.volume = volume;
    });
  }

  volumeChange(v){
    this.playBack.setVolume(v);
  }
}
