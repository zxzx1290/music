import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {
  private socket;
  private URL = 'https://testused.com/';
  private PATH = '/music/socket.io';

  constructor() {
    this.socket = io(this.URL, { path: this.PATH});
    this.socket.on('connect', () => {
      console.log('socketio connected');
    });
    this.socket.on('disconnect', () => {
      console.log('socketio disconnect');
    });
  }

  onEvent(event) {
    return new Observable(observer => {
        this.socket.on(event, (data) => observer.next(data));
    });
  }

  getConnection() {
    return this.socket;
  }

  getMPDStatus() {
    this.socket.emit('status');
  }

  getCurrentSong() {
    this.socket.emit('current-song');
  }

  getCurrentPlaylist() {
    this.socket.emit('current-playlist');
  }

  sendCommand(command, data) {
    this.socket.emit('command', command, data);
  }

  disconnect(message){
    this.socket.disconnect();
  }
}
