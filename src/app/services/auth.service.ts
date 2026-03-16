import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:3000';
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.API}/users?name=${name}`).pipe(
      map(users => {
        const user = users.find(u => u.password === password);
        if (!user) throw new Error('שם משתמש או סיסמה שגויים');
        return user;
      }),
      tap(user => this.currentUser.set(user))
    );
  }

  register(name: string, password: string, fullName: string): Observable<User> {
    return this.http.get<User[]>(`${this.API}/users?name=${name}`).pipe(
      map(users => {
        if (users.length) throw new Error('שם המשתמש כבר קיים במערכת');
        return { name, password, fullName, isAdmin: false };
      }),
      switchMap(newUser => this.http.post<User>(`${this.API}/users`, newUser)),
      tap(user => this.currentUser.set(user))
    );
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
