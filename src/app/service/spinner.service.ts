import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  spinnerS   : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  spinnerMap : Map<string, boolean>     = new Map<string, boolean>()
  constructor() { }

  loadingOn(url : string) {
    this.spinnerMap.set(url, true)
    this.spinnerS.next(true)
  }

  stopLoading(url : string) {
    if(this.spinnerMap.has(url)) {
      this.spinnerS.next(false)
      this.spinnerMap.delete(url)
    }
  }
}
