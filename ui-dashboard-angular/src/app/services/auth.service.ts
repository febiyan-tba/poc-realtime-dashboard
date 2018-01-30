import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';
// Application-specific
import { environment } from '../../environments/environment';
import { Token } from '../models/token';
import { User } from '../models/user';

import * as IdTokenVerifier from 'idtoken-verifier';

@Injectable()
export class AuthService {
  private loggedIn: boolean;

  constructor(private http: HttpClient) {
    this.loggedIn = false;

    if (localStorage.getItem('app-token')) {
      this.loggedIn = true;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(credentials): Observable<User> {
    return this.http.post<Token>(
      environment.authApi + environment.authPath,
      credentials
    )
    .map(result => {
      // Save token to local storage
      localStorage.setItem('app-token', result.token);

      // Get user data
      console.log(IdTokenVerifier);
      const tokenVerifier = new IdTokenVerifier({});
      const decoded = tokenVerifier.decode(result.token);

      const user: User = new User();
      user.id = decoded.id;
      user.name = decoded.name;

      this.loggedIn = true;

      return user;
    })
    // Avoid incidental re-request
    .shareReplay();
  }

  logout(): void {
    localStorage.removeItem('app-token');
    this.loggedIn = false;
  }
}
