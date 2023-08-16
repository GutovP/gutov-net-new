import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, Observable, Subscription, tap, throwError } from 'rxjs';

import { User } from '../core/models/user';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | null | undefined>(undefined);
  user$ = this.user$$.asObservable().pipe(filter((value): value is User | null => value !== undefined));
  user!: User | null;
  subscription: Subscription;

  get isLoggedIn() {
    return this.user !== null

  }
  get notEmpty() {
    if (Array.isArray(this.user)) {
      return this.user.length !== 0
    } else {
      return this.user;
    }
  }
  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }
  register(username: string, email: string, password: string, rePassword: string): Observable<User> {
    return this.http.post<User>(`${baseUrl}/register`, { username, email, password, rePassword }).pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }).pipe(
      tap((data) => {
        this.user$$.next(data);
      })
    );
  }
  logout(): Observable<void> {
    return this.http.get<void>(`${baseUrl}/logout`, {}).pipe(
      tap(() => {
        this.user$$.next(null);
      })
    );
  }
  getProfile(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/profile/${this.user?.id}`).pipe(
      tap(
        (user) => {
          this.user$$.next(user);
          console.log(user)
        }
      ), catchError((err) => {
        this.user$$.next(null);
        return throwError(() => err);
      })
    )
  }
  setProfile(username: string, email: string, password: string): Observable<User> {
    return this.http.put<User>(`/api/edit/${this.user?.id}`, { username, email, password }).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
