import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule, // so we can use ngFor
    RouterModule, // so we can use <router-outlet> and routerLink
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
