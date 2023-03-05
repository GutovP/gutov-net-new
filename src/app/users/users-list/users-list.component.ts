import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] | undefined;

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(private usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    return this.usersService.loadUsers().subscribe(
      {
        next: (data) => {
          this.users = data;

        },
        error: (err) => {
          this.users = err;

        }
      }
    )
  }
}
