import { ToastrService } from 'ngx-toastr';
import { CookieStorageService } from './app/service/cookie-storage.service';
import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { SpinnerService } from './app/service/spinner.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  private accessToken : string 
    constructor(
      private cookieStorage : CookieStorageService,
      private spinnerService : SpinnerService,
      private toastr         : ToastrService
    ) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) :Observable<any> {
      this.accessToken = this.cookieStorage.getCookie('auth-token')
      let modifiedRequest : HttpRequest<any>

      this.spinnerService.loadingOn(request.url)

      if(request.url.includes('users') && !request.url.includes('current')) {
        modifiedRequest = request.clone({
          setHeaders: {
            'Content-type' : 'application/json'
          }
        })
      } else {
        modifiedRequest = request.clone({
          setHeaders: {
            'Content-type' : 'application/json',
            Authorization  : 'Bearer ' + this.accessToken
          }
        })
      }

      return next.handle(modifiedRequest).pipe(
        catchError((error : HttpErrorResponse)=>{
          this.spinnerService.stopLoading(request.url)
          this.toastr.error(`${error.error.message}`, `Error: ${error.status}`)
          return throwError(error)
        }),
      ).pipe(
        (tap(event => {
          if(event.type === HttpEventType.Response) {
            this.spinnerService.stopLoading(request.url)
          }
        })))
    }
}