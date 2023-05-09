import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGaurdServiceService as AuthGuard } from './service/auth-gaurd-service.service';

const routes: Routes = [
  {path : "", redirectTo:"home", pathMatch:'full'},
  {path:'login', component: LoginPageComponent},
  {path: "home", component : HomePageComponent, canActivate: [AuthGuard]},
  {path : '**', redirectTo:"login", pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }