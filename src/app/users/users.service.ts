import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../core/models/user';


const baseUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }
}
