import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { logout, signup } from '../user.action';
import { Router } from '@angular/router';
import { UserState } from '../user.reducer';
import { selectLoggedIn, selectUserList } from '../user.selector';
import { FormControl, FormGroup, PatternValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string='';
  password: string='';
  email: string='';
  phonenumber: string='';
  errorInvalidValue:boolean=false;
  signUpSuccess:boolean =false;
  errorInvalidUserName:boolean=false;
  errorInvalidPhoneNumber:boolean=false;
  errorInvalidEmail:boolean=false;
  errorInvalidPassword:boolean=false;
  errorFlag:boolean=false;
  isLogin:boolean=false;
  

  constructor(private store: Store<UserState>,private router:Router) {
    this.store.pipe(select(selectLoggedIn)).subscribe((loggedIn: boolean) => {
      if(loggedIn){
        this.isLogin=true;
      }
    });
  }
  onLogout(){
    this.store.dispatch(logout());
    this.router.navigate(['login']);
  }
  onManagement(){
    this.router.navigate(['management']);
  }

  onSignup() {
    this.errorInvalidUserName=false;
    this.errorInvalidPhoneNumber=false;
    this.errorInvalidEmail=false;
    this.errorInvalidPassword=false;
    this.errorFlag=false;
    this.errorInvalidValue=false;
    if(!this.username||!this.password||!this.phonenumber||!this.email){
      this.errorInvalidValue=true;
      return;
    }
    if(!this.validatePassword(this.password)){
      this.errorInvalidPassword=true;
      this.errorFlag=true;
    }
    if(!this.validatePhoneNumber(this.phonenumber)){
      this.errorInvalidPhoneNumber=true;
      this.errorFlag=true;
    }
    if(!this.validateEmail(this.email)){
      this.errorInvalidEmail=true;
      this.errorFlag=true;
      
    }
    if(!this.validateUsername(this.username)){
      this.errorInvalidUserName=true;
      this.errorFlag=true;
    }
    if(this.errorFlag){
      return;
    }
    this.store.dispatch(
      signup({
        username: this.username,
        password: this.password,
        email: this.email,
        phonenumber: this.phonenumber,
      })
    );  
    //this.router.navigate(['/login/']);
    }
    validatePhoneNumber(phoneNumber: string): boolean {
      const phoneRegex = /^\d{9,}$/; // Regex cho số điện thoại, ít nhất 10 chữ số
    
      return phoneRegex.test(phoneNumber);
    }
    validateEmail(email: string): boolean {
      const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      return regex.test(email);
    }
    validateUsername(username: string): boolean {
      let isUsernameValid = true;
    
      this.store.select(selectUserList).subscribe((userList) => {
        const existingUser = userList.find((user) => user.username === username);
        if (existingUser) {
          isUsernameValid = false;
        }
      });
    
      return isUsernameValid;
    }
    validatePassword(password:string):boolean{
      const passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      return passwordPattern.test(password);
    }
}
