import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

import { ToastModule } from './toast/toast.module';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule, // so we can use ngFor
    RouterModule, // so we can use <router-outlet> and routerLink
    ToastModule
  ],
  exports: [HeaderComponent, ToastModule, FooterComponent]
})
export class CoreModule { }
