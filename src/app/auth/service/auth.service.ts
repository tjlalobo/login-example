import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { User } from '../../login/models/user';
import { USERS } from '../mock-data/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  redirectUrl: string;

  constructor() { }

  login(credentials: { email: string, password: string }): Observable<User> {
    console.log('logging in...')

    return of(
      USERS.find(u => u.email === credentials.email)
      ).pipe(
        delay(1000),
        tap(u => {
              if (u) {
                console.log('login successful');
                this.isLoggedIn = true;
              }else {
                console.log('login failed');
                this.isLoggedIn = false;
              }
            }
          )
        );
  }

  logout() {
    console.log('logging out...');
    this.isLoggedIn = false;
    console.log('logout successful');
  }

}
