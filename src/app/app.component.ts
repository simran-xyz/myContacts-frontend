import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myContacts-frontend';

  isLoading : boolean = false

  constructor( private spinnerService : SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.spinnerS.subscribe((loading) => {
      this.isLoading = loading
    })
  }
}
