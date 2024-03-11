import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';
import { Store } from '@ngrx/store';
import { UserState } from '../user.reducer';
import { signup } from '../user.action';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent implements OnInit {
  
  isUserNameValid:boolean=true;
  isPhoneNumberValid:boolean=true;
  isEmailValid:boolean=true;
  isPasswordValid:boolean=true;
  userUpdate:User;
  action:string;
  dataTemp:User;
  userData: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    phonenumber: ''
  }; // Khai báo thuộc tính userData
  constructor(private store:Store<UserState>,public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private validation:ValidationService
  ) {
    this.action=data.action;
    this.dataTemp=data.userData;
    
  }
  ngOnInit(): void {
    //make deep copy
    this.userData=JSON.parse(JSON.stringify(this.dataTemp));
  }
  onSubmit(userData:User): void {
    let isValueValid=this.validatingUser(userData);
    if(this.action==='add'){
      if(isValueValid){
        this.dialogRef.close(userData);
      }
      else{
        return;
      }
    }
    if(this.action==='update'){
      if(isValueValid){
        console.log('update');
        this.dialogRef.close(userData);
      }
      else{
        console.log('invalid');
        return;
      }
    }
  }
  
  onCancel(): void {
    // Hủy bỏ việc thêm người dùng và đóng modal
    this.dialogRef.close();
  }
  validatingUser(userData:User):any{
    this.isUserNameValid=this.validation.validateUsername(userData.username);
    this.isPasswordValid=this.validation.validatePassword(userData.password);
    this.isEmailValid=this.validation.validateEmail(userData.email);
    this.isPhoneNumberValid=this.validation.validatePhoneNumber(userData.phonenumber);
    console.log(userData.password);
    
    if(!this.isUserNameValid||!this.isPasswordValid||!this.isEmailValid||!this.isPhoneNumberValid||!this.isUserNameValid){
      return false;
    }
    return true;
  }
}
