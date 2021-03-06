import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }   from '@angular/router';

import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

import { AuthService, TOK_KEY } from '../auth/service/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    const user$ = this.authService.login(this.loginForm.value);
    user$.subscribe(u => {
      if (this.storage.has(TOK_KEY)) {
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/dashboards';
        this.router.navigateByUrl(redirect);
      }
    });
  }

}
