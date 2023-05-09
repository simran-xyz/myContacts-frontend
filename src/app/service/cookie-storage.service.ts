import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(
    private cookieService : CookieService
  ) { }

  setCookie(key : any, value : any) {
    this.cookieService.set(key, value)
  }

  getCookie(key:any) {
    return this.cookieService.get(key)
  }
}
