import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppMainComponent } from './app-main/app-main.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: AppMainComponent, pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
