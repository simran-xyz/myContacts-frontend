import { enviroment } from './../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
}) 
export class LoginService {
  API_URL : string = 'http://localhost:5001/api'
  httpHeader = new HttpHeaders().set('Content-type','application/json')

  constructor(
    private httpClient : HttpClient
    ) { }

  registerUser(data : any) : Observable<any> {
    return this.httpClient.post(enviroment.BASE_URL + "/users/register",data ,{headers : this.httpHeader})
  }

  loginUser(data : any) :Observable<any> {
    return this.httpClient.post(enviroment.BASE_URL + "/users/login", data)
  }

  currentUser() :Observable<any> {
    return this.httpClient.get(enviroment.BASE_URL + "/users/current")
  }
}
