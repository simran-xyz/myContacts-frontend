import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { Interceptor } from 'src/interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { UpdateContactDialogComponent } from './home-page/update-contact-dialog/update-contact-dialog.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './home-page/confirmation-dialog/confirmation-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserDetailsDialogComponent } from './home-page/user-details-dialog/user-details-dialog.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt'; 
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    UpdateContactDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ timeOut: 2000, enableHtml: true }), 
    
  ],
  providers: [
    {
      provide : LocationStrategy, 
      useClass: HashLocationStrategy},
    {
      provide : HTTP_INTERCEPTORS,
      useClass : Interceptor,
      multi : true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {
        hasBackdrop: true, direction: 'ltr'
      }
    },
    { 
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
