import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { CrudService } from '../service/crud.service';
import { CookieStorageService } from '../service/cookie-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateContactDialogComponent } from './update-contact-dialog/update-contact-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  contacts    : any[] = []
  userDetails : any
  constructor(
    private cookieStorage : CookieStorageService,
    private crudservice : CrudService,
    private loginService : LoginService,
    private matDialog   : MatDialog,
    private router      : Router,
    private toastr      : ToastrService
    ) {
      this.loginService.currentUser().subscribe(res => {
        this.userDetails = res
      })
    }

  ngOnInit(): void {
    this.crudservice.getAllContacts().subscribe(res => {
      this.contacts = res
    })
  }

  addContact(action : string, contact ?: any[]) {
    const dialogRef = this.matDialog.open(UpdateContactDialogComponent,{
      data : {
        action : action,
        contact  : action=='EDIT'? contact : null,
      },
      width  : '600px' 
    })
  }

  removeContact(id : any) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed().subscribe(res => {
      if(res === 'yes') {
        this.crudservice.deleteContact(id).subscribe(res => {
          this.toastr.success('Contact Deleted Successfully', 'Delete Contact')
          window.location.reload()
        })
      }
    })
  }

  signOut() {
    this.router.navigate(['/login'])
    this.cookieStorage.setCookie('auth-token', null)
    this.toastr.success('User Logged Out', 'Log Out')
  }

  getUserDetails() {
    this.matDialog.open(UserDetailsDialogComponent, {
      data : this.userDetails
    })
  }
}
