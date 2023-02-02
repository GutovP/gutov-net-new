import { Component, OnInit } from '@angular/core';

import { HeaderItems } from './header-items';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed = true;
  headerItems: HeaderItems[] | undefined;
  unAuthItems: HeaderItems[] | undefined;
  authItems: HeaderItems[] | undefined;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  get notEmpty() {
    return this.authService.notEmpty;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.headerItems = [
      { caption: 'Home', path: 'home', link: [''] },
      { caption: 'Users', path: 'users', link: ['/users'] },
    ];

    this.unAuthItems = [
      { caption: 'Login', path: 'login', link: ['/auth/login'] },
      { caption: 'Register', path: 'register', link: ['/auth/register'] },
    ];

    this.authItems = [
      { caption: 'Profile', path: 'profile', link: ['/auth/profile'] },
      { caption: 'Logout', path: 'logout', link: ['/auth/logout'] },
    ];
  }

}
