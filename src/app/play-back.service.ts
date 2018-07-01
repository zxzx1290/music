import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayBackService {
  private song = {id: null, title: "Loading...", artist: "Loading...", duration: 0, elapsed: 0, imgsrc: null};
  private status = {playing: false};
  private mpdStatus = {};
  private volume = 1;

  private autoClacElapsed = null;

  private statusChange = new BehaviorSubject(this.status);
  onStatusChange = this.statusChange.asObservable();

  private songChange = new BehaviorSubject(this.song);
  onSongChange = this.songChange.pipe(skip(1));

  private playChange = new BehaviorSubject(false);
  onPlayChange = this.playChange.asObservable();

  private volumeChange = new BehaviorSubject(0);
  onVolumeChange = this.volumeChange.asObservable();

  private songElapsedChange = new BehaviorSubject(0);
  onSongElapsedChange = this.songElapsedChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  setVolume(v) {
    this.volume = v;
    this.volumeChange.next(v);
  }

  stopAutoSeek() {
    clearInterval(this.autoClacElapsed);
  }

  processStatus(status){
    if(this.compareObjects(status, this.mpdStatus)){
      console.log('same status');
      return;
    }else{
      this.mpdStatus = status;
      console.log(status);
    }
    this.song.elapsed = status.elapsed;
    switch(status.state){
      case 'play':
        if(!this.status.playing) this.playChange.next(true);
        this.status.playing = true;
        clearInterval(this.autoClacElapsed);
        this.autoClacElapsed = setInterval(() => {
          this.song.elapsed = Math.floor(this.song.elapsed+1);
          this.songElapsedChange.next(this.song.elapsed);
        },1000);
        break;
      case 'pause':
        if(this.status.playing) this.playChange.next(false);
        this.status.playing = false;
        clearInterval(this.autoClacElapsed);
        break;
      default:
        console.error('unknown playing');
    }
  }


  processSong(song){
    if(this.song.id === song.id){
      console.log('same song, skip');
      return;
    }else{
      console.log(song);
      this.song.id = song.id;
      this.song.duration = song.duration;
    }

    if(!song.title){
      song.title = song.path;
    }
    this.song.title = song.title;
    this.song.artist = song.artist;

    (async () => {
      if(song.hasAlbum) {
        this.song.imgsrc = await this.processAlbumImage();
      }else{
        this.song.imgsrc = 'assets/default-album-art.png';
      }
      // emit event
      this.songChange.next(this.song);
    })();

  }

  private processAlbumImage(){
    return new Promise((resolve, reject) => {
      this.httpClient.get('https://testused.com/music/album?r='+Math.random().toString(16).substring(2), {responseType: "blob"}).subscribe(
      (val) => {
      console.log("albumImage download success", val);
        // read image
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false);

        reader.readAsDataURL(val);
      },
      response => {
        console.log("albumImage download failed", response);
        reject(false);
      },
      () => {
          //console.log("albumImage download completed.");
      });
    });
  }

  private compareObjects(object1, object2){
      let equal = true;
      for(let [key, value] of Object.entries(object1)) {
        if (!object2.hasOwnProperty(key)){
          equal = false;
        }else if(object2[key] !== value){
          equal = false;
        }
      }
      return equal;
  }
}
