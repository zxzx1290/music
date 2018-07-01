import { Component, OnInit, Input } from '@angular/core';
import { SocketIOService } from '../../socket-io.service';
import { PlayBackService } from '../../play-back.service';

@Component({
  selector: 'app-library-main',
  templateUrl: './library-main.component.html',
  styleUrls: ['./library-main.component.scss']
})
export class LibraryMainComponent implements OnInit {

  @Input()
  fontColor;

  playlist;
  currentSong = {};

  constructor(private socketio: SocketIOService, private playBack: PlayBackService) { }

  ngOnInit() {
    this.socketio.onEvent('connect').subscribe(() => {
      console.log('LibraryMainComponent connect');
      this.socketio.getCurrentPlaylist();
    });

    this.socketio.onEvent('current-playlist').subscribe((playlist) => {
      this.playlist = playlist;
    });

    this.socketio.onEvent('status-change').subscribe((status) => {
      // this.processStatus(status);
    });

    // 訂閱音樂變動事件
    this.playBack.onSongChange.subscribe(song => {
      this.currentSong = song;
    });
  }

  doSwitchSong(id){
    this.socketio.sendCommand('switch', id);
  }

}
