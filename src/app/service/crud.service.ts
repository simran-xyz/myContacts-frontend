import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API_URL : string = 'http://localhost:5001/api'
  httpHeader = new HttpHeaders().set('Content-type','application/json')
  constructor( private httpClient : HttpClient) { }

  getAllContacts() : Observable<any> {
    return this.httpClient.get(enviroment.BASE_URL + "/contacts/")
  }

  addContact(data : any) : Observable<any> {
    return this.httpClient.post(enviroment.BASE_URL + "/contacts/", data)
  }

  getContact(id : any) : Observable<any> {
    return this.httpClient.get(enviroment.BASE_URL + "/contacts/", {
      params : {
        id : id
      }
    })
  }

  updateContact(id : any, data: any) : Observable<any> {
    return this.httpClient.put(enviroment.BASE_URL + "/contacts/" + id, data)
  }

  deleteContact(id : any) : Observable<any> {
    return this.httpClient.delete(enviroment.BASE_URL + "/contacts/" + id)
  }
}
