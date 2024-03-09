import { Component, Inject } from '@angular/core';
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
export class AddUserModalComponent {
  
  isUserNameValid:boolean=true;
  isPhoneNumberValid:boolean=true;
  isEmailValid:boolean=true;
  isPasswordValid:boolean=true;
  
  constructor(private store:Store<UserState>,public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private validation:ValidationService
  ) {}
  userData: User = {
    id: 0,
    username: '',
    password: '',
    email: '',
    phonenumber: ''
  }; // Khai báo thuộc tính userData

  onAddUser(userData:User): void {
    let isValueValid=true;
    this.isUserNameValid=this.validation.validateUsername(userData.username);
    this.isPasswordValid=this.validation.validatePassword(userData.password);
    this.isEmailValid=this.validation.validateEmail(userData.email);
    this.isPhoneNumberValid=this.validation.validatePhoneNumber(userData.phonenumber);
    if(!this.isUserNameValid||!this.isPasswordValid||!this.isEmailValid||!this.isPhoneNumberValid||!this.isUserNameValid){
      isValueValid=false;
      return;
    }

    if(isValueValid){
      this.dialogRef.close(userData);
    }
  }
  
  onCancel(): void {
    // Hủy bỏ việc thêm người dùng và đóng modal
    this.dialogRef.close();
  }
}
