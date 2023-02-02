import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from 'src/app/core/toast/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.user = null;
    });
    this.toastService.activate('successfully logged out');
    this.router.navigate(['']);
  }
}
