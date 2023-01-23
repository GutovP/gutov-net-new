import { Component, OnInit } from '@angular/core';

import { HeaderItems } from './header-items';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navbarCollapsed = true;
  public isLoggedIn = false;

  headerItems: HeaderItems[] | undefined;
  unAuthItems: HeaderItems[] | undefined;
  authItems: HeaderItems[] | undefined;

  constructor() { }

  ngOnInit(): void {

    this.headerItems = [
      { caption: 'Home', path: 'home', link: ['/home'] },
      { caption: 'Users', path: 'users', link: ['/users'] },
    ];

    this.unAuthItems = [
      // { caption: 'Login', path: 'login', link: ['/auth/login'] },
      { caption: 'Register', path: 'register', link: ['/auth/register'] },
    ];

    // this.authItems = [
    //   { caption: 'Profile', path: 'profile', link: ['/auth/profile'] },
    //   { caption: 'Logout', path: 'logout', link: ['/auth/logout'] },
    // ];
  }

}
