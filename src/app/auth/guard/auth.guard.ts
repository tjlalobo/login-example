import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { AuthService, TOK_KEY } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router, 
    private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated(state.url);
  }

  isAuthenticated(redirect: string): boolean {
    if (this.storage.has(TOK_KEY)) { return true; }

    this.authService.redirectUrl = redirect;

    this.router.navigate(['/login']);  
    return false;
  }
  
}
