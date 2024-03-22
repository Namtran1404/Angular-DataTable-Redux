import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserState } from '../../redux/user.reducer';
import { User } from '../../model/user.model';
import { APIService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ValidationService } from '../../service/validation.service';
import { AddUserValidation } from '../../model/addUser.validate.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  confirmPassword:string;
  userData: User = new User();
  showPassword:boolean=false;
  showConfirmPassword:boolean=false;


  constructor(private store: Store<UserState>,private router:Router,
    public apiService:APIService,public authService:AuthService,private http: HttpClient,
    private validation:ValidationService,public addUserValidate:AddUserValidation) {
      this.addUserValidate=new AddUserValidation();
  }
  onSignup(userData:User) {
    
    let isValueValid=this.validation.validatingUser(this.addUserValidate,userData,this.confirmPassword);
      if(isValueValid){
        this.apiService.addUserV2(userData).subscribe(() => {
          console.log('SignIn sucessd!');
          this.router.navigate(['/login/']);
          // Handle success, potentially update UI
        },
        (error: any) => {
          this.validation.handleExistedInformationError(this.addUserValidate,error);
           return error;
        }
        );
      }
    }
    toggleConfirmPassword(){
      this.showConfirmPassword=!this.showConfirmPassword;
    }
    togglePassword(){
      this.showPassword=!this.showPassword;
    }
}
