import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserList } from '../redux/user.selector';
import { UserState } from '../redux/user.reducer';
import { User } from '../model/user.model';
import { AddUserValidation } from '../model/addUser.validate.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private store: Store<UserState>) {}

  validateUserName(username:string):boolean{
    if(username==='')
      return false;
    return true;
  }
  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /((84|0[3|5|7|8|9])+([0-9]{8})\b)/g; // Regex for phone number, at least 10 digits

    return phoneRegex.test(phoneNumber);
  }

  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordPattern.test(password);
  }
  validateConfirmPassword(password:string,confirmPassword:string):boolean{
    if(password===confirmPassword){
      return true;
    }
    return false;
  }
  validatingUserForUpdate(addUserValidate:AddUserValidation,userData:User):any{
   
    addUserValidate.isEmailValid=this.validateEmail(userData.email);
    addUserValidate.isPhoneNumberValid=this.validatePhoneNumber(userData.phonenumber);
    if(!addUserValidate.isEmailValid){
      return false;
    }
    else if(!addUserValidate.isPhoneNumberValid){
      return false;
    }
    return true;
  }

  validatingUser(addUserValidate:AddUserValidation,userData:User,confirmPassword:string):any{
    addUserValidate.isUsernameValid=this.validateUserName(userData.username);
    addUserValidate.isPasswordValid=this.validatePassword(userData.password);
    addUserValidate.isEmailValid=this.validateEmail(userData.email);
    addUserValidate.isPhoneNumberValid=this.validatePhoneNumber(userData.phonenumber);
    addUserValidate.isConfirmPasswordValid=this.validateConfirmPassword(userData.password,confirmPassword);
    // console.log(userData.password);
    if(!addUserValidate.isUsernameValid){
      return false;
    }
    else if(!addUserValidate.isPasswordValid){
      return false;
    }
    else if(!addUserValidate.isConfirmPasswordValid){
      return false;
    }
    else if(!addUserValidate.isEmailValid){
      return false;
    }
    else if(!addUserValidate.isPhoneNumberValid){
      return false;
    }
    return true;
  }
  handleExistedInformationError(addUserValidate:AddUserValidation,error:any){
    addUserValidate.isEmailExisted=false;
    addUserValidate.isPhoneNumberExisted=false;
    addUserValidate.isUsernameExisted=false;
    if(error.error==='Username already exists'){
      addUserValidate.isUsernameExisted=true;
    }
    if(error.error==='Email address already exists'){
      addUserValidate.isEmailExisted=true;
    }
    if(error.error==='Phone number already exists'){
      addUserValidate.isPhoneNumberExisted=true;
    }
  }
}