import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSliderModule } from '@angular/material/slider';

import { AppMainComponent } from './app-main/app-main.component';
import { PlayingMainComponent } from './playing-main/playing-main.component';
import { OtherMainComponent } from './other-main/other-main.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LibraryModule } from './library/library.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    PlayingMainComponent,
    OtherMainComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LibraryModule,

    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    FlexLayoutModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
