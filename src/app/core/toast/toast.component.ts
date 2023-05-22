import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private defaults = {
    title: '',
    message: 'default tost message'
  };
  private toastElement: any;
  title: string | undefined;
  message: string | undefined;

  constructor(private toastService: ToastService) {
    //adding the service to new subscription so we can destroy it later
    this.subscription.add(this.toastService.toast$.subscribe((toastMessage) => {
      this.activate(toastMessage.message);
    }))
  }
  activate(message = this.defaults.message, title = this.defaults.title) {
    this.title = title;
    this.message = message;
    this.show();
  }
  ngOnInit(): void {
    this.toastElement = document.getElementById('toast');
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private show() {
    this.toastElement.style.opacity = 1;
    this.toastElement.style.zIndex = 9999;

    window.setTimeout(() => this.hide(), 3000)
  }
  private hide() {
    this.toastElement.style.opacity = 0;

    window.setTimeout(() => (this.toastElement.style.zIndex = 0), 3000)
  }
}
