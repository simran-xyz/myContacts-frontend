import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {PATTERNS} from '../../enums'
import { LoginService } from '../service/login.service';
import { CookieStorageService } from '../service/cookie-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  isUserRegistered : boolean = true
  loginUser        : FormGroup 
  show             : boolean = false

  constructor(
    private fb            : FormBuilder,
    private loginService  : LoginService,
    private cookieStorage : CookieStorageService,
    private toastr        : ToastrService,
    private router        : Router
  ) {}

  ngOnInit(): void {
    this.loginUser = this.fb.group({
      email    : [null,[ Validators.required, Validators.pattern(PATTERNS.email)]],
      password : [null,[ Validators.required]]
    })    
  }

  get loginUserControls() {
    return this.loginUser.controls
  }

  toggle() {
    this.loginUser.reset()
    this.isUserRegistered = !this.isUserRegistered
    if(!this.isUserRegistered){
      this.loginUser.addControl('username', new FormControl(null, [ Validators.required]))
    } else {
      this.loginUser.removeControl('username')
    }
  }

  registerUser() {
    let reqObj = {
      username : this.loginUser.value.username,
      email    : this.loginUser.value.email,
      password : this.loginUser.value.password,
    }
    this.loginService.registerUser(reqObj).subscribe((res) => {
      this.login()
    })
  }

  login() {
    let reqObj = {
      email    : this.loginUser.value.email,
      password : this.loginUser.value.password,
    }
    this.loginService.loginUser(reqObj).subscribe((res) => {
      this.cookieStorage.setCookie('auth-token', res.accessToken)
      this.toastr.success('LogIn Successful', 'success')
      this.router.navigate(['/home'])
    })
  }

  password() {
    this.show = !this.show;
  }
}

