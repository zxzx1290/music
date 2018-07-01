import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function getWindow (): any {
    return window;
}


@Injectable({
  providedIn: 'root'
})
export class HtmlInterfaceService {

  constructor(@Inject(DOCUMENT) public document: any) { }

  get nativeWindow () {
      return getWindow();
  }

  get nativeDocument () {
      return this.document;
  }
}
