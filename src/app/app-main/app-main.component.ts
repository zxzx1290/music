import { Component, OnInit, Output } from '@angular/core';

import { HtmlInterfaceService } from '../html-interface.service';

@Component({
  selector: 'app-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {

  @Output()
  fontColor = "rgb(255,255,255)";

  background = "#fff";

  constructor(private htmlInterface: HtmlInterfaceService) { }

  ngOnInit() {
  }

  doChangeBackground(color) {
    console.log('%cNOW BACKGROUND COLOR r:'+color['r']+' g:'+color['g']+' b:'+color['b'], 'background: rgb('+color['r']+','+color['g']+','+color['b']+'); color: #fff');

    // 變更背景
    this.background = 'rgb('+color['r']+','+color['g']+','+color['b']+')';

    // 變更UI元件顏色
    if(color['r'] > 150 && color['g'] > 150 && color['b'] > 150) {
      this.fontColor = "rgb(0,0,0)";
    }else{
      this.fontColor = "rgb(255,255,255)";
    }

    [].forEach.call( this.htmlInterface.document.querySelectorAll('.mat-accent .mat-slider-thumb, .mat-accent .mat-slider-thumb-label, .mat-accent .mat-slider-track-fill') , (div) => {
      div.style['background-color'] = this.fontColor;
    });
  }

}
