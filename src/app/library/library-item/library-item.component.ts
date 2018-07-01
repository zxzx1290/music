import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.scss']
})
export class LibraryItemComponent implements OnInit {

  @Input()
  item;

  @Input()
  fontColor;

  @Input()
  currentSong;

  @Output()
  switchSong = new EventEmitter();

  @HostListener('click', ['$event']) onClick($event){
    console.info('switch song id ' + this.item.id);
    this.switchSong.emit(this.item.id);
  }

  constructor() { }

  ngOnInit() {
    // console.log(this.item);
  }

}
