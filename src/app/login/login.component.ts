import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { login } from '../user.action';
import { Router } from '@angular/router';
import { UserState } from '../user.reducer';
import { selectLoggedIn, selectLoggedUser } from '../user.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  id:Number | undefined;
  username:string='';
  password:string='';
  errorEmptyField:boolean = false;
  errorInvalidUserName:boolean=false;
  isLogin:boolean=false;
  constructor(private store: Store<UserState>,private router:Router) {
    this.store.pipe(select(selectLoggedIn)).subscribe((loggedIn: boolean) => {
      if(loggedIn){
        this.isLogin=true;
      }
    });
  }

   onLogin() {
    this.errorInvalidUserName=false;
    if (!this.username || !this.password) {
      this.errorEmptyField = true;
      this.errorInvalidUserName=false;
      return;
    }
    this.store.dispatch(
      login({
        username: this.username,
        password: this.password,
      })
    );
    this.store.pipe(select(selectLoggedUser)).subscribe((user: any) => {
      if(user===null){
        this.errorInvalidUserName=true;
        this.errorEmptyField=false
        this.password='';
      }
    });
    if(!this.errorInvalidUserName){
      this.router.navigate(['user-detail']);
    }
  }
  backToDetail(){
    this.router.navigate(['user-detail'])
  }
}
