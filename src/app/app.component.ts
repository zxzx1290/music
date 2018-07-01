import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  constructor(router:Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('AppComponent OnDestroy');
  }
}
