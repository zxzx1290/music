import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { SocketIOService } from '../socket-io.service';
import { HtmlInterfaceService } from '../html-interface.service';
import { PlayBackService } from '../play-back.service';

import { trigger, animate, transition, style, state } from '@angular/animations';


@Component({
  selector: 'app-playing-main',
  templateUrl: './playing-main.component.html',
  styleUrls: ['./playing-main.component.scss'],
  animations: [
    trigger('fadeAnimation', [
       state('out' , style({ opacity: 0 })),
       state('in', style({ opacity: 1 })),
       state('void', style({})),
       transition('* => out', animate('0.5s')),
       transition('* => in', animate('0.5s')),
       transition('* => void', animate('0s'))
     ])
  ]
})
export class PlayingMainComponent implements OnInit, OnDestroy {

  @Input()
  fontColor;

  @Output()
  changeBackground = new EventEmitter();

  song = {id: null, title: {old: "Loading...", new: "Loading"}, artist: {old: "Loading...", new: "Loading"}, duration: 0, elapsed: 0, imgsrc: {old: 'assets/default-album-art.png', new: 'assets/default-album-art.png'}};
  status = {playing: false};
  fadeAlbum = {new: 'void', old: 'void'};
  fadeSongTitle = {new: 'void', old: 'void'};
  fadeSongArtist = {new: 'void', old: 'void'};

  constructor(private socketio: SocketIOService, private playBack: PlayBackService, private htmlInterface: HtmlInterfaceService) { }

  ngOnInit() {
    this.socketio.onEvent('connect').subscribe(() => {
      console.log('PlayingMainComponent connect');
      this.socketio.getMPDStatus();
      this.socketio.getCurrentSong();
    });

    this.socketio.onEvent('status').subscribe((status) => {
      this.processStatus(status);
    });

    this.socketio.onEvent('current-song').subscribe((song) => {
      this.processSong(song);
    });

    this.socketio.onEvent('status-change').subscribe((status) => {
      this.processStatus(status);
    });

    this.socketio.onEvent('song-change').subscribe((song) => {
      this.processSong(song);
    });

    this.htmlInterface.nativeWindow.audioP = this.htmlInterface.nativeDocument.getElementById('myaudio');
    this.playBack.setVolume(0.02);

    // 訂閱播放變更事件
    this.playBack.onPlayChange.subscribe(playing => {
      this.status.playing = playing;
      if(this.status.playing){
        console.log('play audio');
        this.htmlInterface.nativeWindow.audioP.src = this.getAudioSrc();
        this.htmlInterface.nativeWindow.audioP.play().then(() => {
            ;
        }).catch((err) => {
            //this.htmlInterface.nativeWindow.audioP.controls = true;
            this.htmlInterface.nativeDocument.getElementById('wrapper').style.display = 'flex';
            this.htmlInterface.nativeWindow.audioP.pause();
        });
      }else{
        console.log('pause audio');
        this.htmlInterface.nativeWindow.audioP.pause();
        this.htmlInterface.nativeWindow.audioP.src = '';
      }
    });

    // 訂閱音樂變動事件
    this.playBack.onSongChange.subscribe(song => {
      console.log("play song id "+song.id.toString());

      this.song.id = song.id;
      this.song.title.new = song.title;
      this.song.artist.new = song.artist;
      this.song.duration = song.duration;
      this.song.elapsed = song.elapsed;
      this.song.imgsrc.new = song.imgsrc;

      this.fadeAlbum.old = 'out';
      this.fadeAlbum.new = 'in';

      this.fadeSongTitle.old = 'out';
      this.fadeSongTitle.new = 'in';

      this.fadeSongArtist.old = 'out';
      this.fadeSongArtist.new = 'in';

    });

    // 訂閱音量變動事件
    this.playBack.onVolumeChange.subscribe(volume => {
      this.htmlInterface.nativeWindow.audioP.volume = volume;
    });

    // 訂閱音樂剩餘時間變更事件
    this.playBack.onSongElapsedChange.subscribe(elapsed => {
      this.song.elapsed = elapsed;
    });
  }

  processStatus(status) {
    this.playBack.processStatus(status);
  }

  processSong(song) {
    this.playBack.processSong(song);
  }


  sendCommand(e) {
    console.log(e.target.getAttribute('command'));
    this.socketio.sendCommand(e.target.getAttribute('command'), null);
  }

  positionSeek(v){
    console.log(v);
    this.socketio.sendCommand('seek',v);
  }

  stopAutoSeek(){
    this.playBack.stopAutoSeek();
  }

  removeWrapper(e) {
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 1000);
    this.htmlInterface.nativeWindow.audioP.style.display = 'none';
    this.htmlInterface.nativeWindow.audioP.play();
  }

  fadeAnimationStart(e){
    switch(e.toState){
      case 'in':
        ;
        break;
      case 'out':
        ;
        break;
      default:
        ;
    }
  }

  fadeAnimationDone(e) {
    switch(e.toState){
      case 'in':
        if(e.element.classList.contains('album')){
          this.song.imgsrc.old = this.song.imgsrc.new;
          let color = this.getAverageRGB(e.element);

          this.changeBackground.emit(color);
        }
        if(e.element.classList.contains('song-title')){
          this.song.title.old = this.song.title.new;
        }
        if(e.element.classList.contains('song-artist')){
          this.song.artist.old = this.song.artist.new;
        }
        break;
      case 'out':
        setTimeout(() => {
          if(e.element.classList.contains('album')){
            this.fadeAlbum.old = 'void';
            this.fadeAlbum.new = 'void';
          }
          if(e.element.classList.contains('song-title')){
            this.fadeSongTitle.old = 'void';
            this.fadeSongTitle.new = 'void';
          }
          if(e.element.classList.contains('song-artist')){
            this.fadeSongArtist.old = 'void';
            this.fadeSongArtist.new = 'void';
          }
        }, 100);

        break;
      default:
        ;
    }
  }

  private getAudioSrc(){
    return 'https://testused.com/listen?r='+Math.random().toString(16).substring(2);
  }

  private getAverageRGB(imgEl) {
      var blockSize = 5, // only visit every 5 pixels
          defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
          canvas = document.createElement('canvas'),
          context = canvas.getContext && canvas.getContext('2d'),
          data, width, height,
          i = -4,
          length,
          rgb = {r:0,g:0,b:0},
          count = 0;

      if (!context) {
          return defaultRGB;
      }

      height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

      context.drawImage(imgEl, 0, 0);

      try {
          data = context.getImageData(0, 0, width, height);
      } catch(e) {
          /* security error, img on diff domain */
          return defaultRGB;
      }

      length = data.data.length;

      while ( (i += blockSize * 4) < length ) {
          ++count;
          rgb.r += data.data[i];
          rgb.g += data.data[i+1];
          rgb.b += data.data[i+2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      return rgb;

  }


  ngOnDestroy() {
    console.log('PlayingMainComponent OnDestroy');
  }
}
