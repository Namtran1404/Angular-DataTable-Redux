import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { login } from '../../redux/user.action';
import { Router } from '@angular/router';
import { UserState } from '../../redux/user.reducer';
import { selectLoggedIn, selectLoggedUser } from '../../redux/user.selector';
import { AuthService } from '../../service/auth.service';
import { LoginModel } from '../../model/login.model';
import { LoginValidate } from '../../model/login.validate';
import { APIService } from '../../service/api.service';
import { RouterTestingHarness } from '@angular/router/testing';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginModel:LoginModel=new LoginModel();
  loginValidate:LoginValidate=new LoginValidate();
  showPassword:boolean=false;

  backToDetail(){
    this.router.navigate(['user-detail'])
  }
  constructor(private authService: AuthService,private router:Router,private apiService:APIService) {
    if (this.authService.isLoggedIn()) { // Check for token
      this.apiService.getUsersAPI().subscribe(
        (response) => {
          return this.router.navigate(['management']);
        },
        (error) => {
          this.authService.logout();
          return this.router.navigate(['/auth/login']);
        });
    }
    
  }
  ngOnInit(): void {

  }
  

  login() {
    if(this.loginValidate.isEmpty(this.loginModel.username,this.loginModel.password)){
      return;
    }
    this.authService.login(this.loginModel.username, this.loginModel.password)
      .subscribe(
        (response) => {
          // Handle successful login (e.g., store token)
          const token = response.token;
          this.authService.setToken(token);
          const refreshToken=response.refreshToken;
          this.authService.setRefreshToken(refreshToken);
          console.log('token',token);
          this.router.navigate(['management']);
        },
        (error) => {
          // Handle login errors
          console.error(error);
          console.log(error.status);
          if(error.status===401||error.status===400){
            this.loginValidate.errorInvalidUserName=true;
            this.loginModel.password='';
          }
        }
      );
  }
  logout(){
    this.authService.logout();

  }
  togglePassword(){
    this.showPassword=!this.showPassword;
  }
}
