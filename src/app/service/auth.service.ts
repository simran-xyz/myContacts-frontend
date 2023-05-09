import { Injectable } from '@angular/core';
import { CookieStorageService } from './cookie-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieStorage : CookieStorageService,
    private jwtHelp       : JwtHelperService
  ) { }

  isAuthenticated() {
    const token = this.cookieStorage.getCookie('auth-token')
    return !this.jwtHelp.isTokenExpired(token)
  }
}
