import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private router: Router
  ) {}

  isAuthenticated() {
    const token = localStorage.getItem('accessToken');

    if(token) {
      const decoded_token = jwt_decode(token);

      if(decoded_token) {
          return true;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

}