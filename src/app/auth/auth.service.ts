import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Subscription, tap } from 'rxjs';

import { User } from '../core/models/user';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this.user$$.asObservable().pipe(filter((value): value is User | null => value !== undefined));
  user: User | null = null;
  subscription: Subscription;

  get isLoggedIn() {
    return this.user !== null;
  }
  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }


  register(username: string, email: string, password: string, rePassword: string) {
    return this.http.post<User>(`${baseUrl}/register`, { username, email, password, rePassword }).pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
