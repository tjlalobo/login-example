import { Injectable, Inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { User } from '../../login/models/user';
import { USERS } from '../mock-data/users';

export const TOK_KEY = "tok";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  login(credentials: { email: string, password: string }): Observable<User> {
    console.log('logging in...')

    return of(
      USERS.find(u => u.email === credentials.email)
      ).pipe(
        delay(5000),
        tap(u => {
              if (u) {
                console.log('login successful');
                this.storage.set(TOK_KEY, u);
              }else {
                console.log('login failed');
              }
            }
          )
        );
  }

  logout() {
    console.log('logging out...');
    this.storage.remove(TOK_KEY);
    console.log('logout successful');
  }

}
