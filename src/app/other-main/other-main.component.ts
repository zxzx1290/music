import { Component, OnInit, Input } from '@angular/core';

import { SocketIOService } from '../socket-io.service';
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
  listeners = '0';

  constructor(private socketio: SocketIOService, private playBack: PlayBackService) { }

  ngOnInit() {
    this.playBack.onVolumeChange.subscribe(volume => {
      this.volume = volume;
    });

    this.socketio.onEvent('listeners').subscribe((listeners: string) => {
      this.listeners = listeners;
    });
  }

  volumeChange(v){
    this.playBack.setVolume(v);
  }
}
