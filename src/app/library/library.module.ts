import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryMainComponent } from './library-main/library-main.component';
import { LibraryItemComponent } from './library-item/library-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LibraryMainComponent, LibraryItemComponent],
  exports: [LibraryMainComponent]
})
export class LibraryModule { }
