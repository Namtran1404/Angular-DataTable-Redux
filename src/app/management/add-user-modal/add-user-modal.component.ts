import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../redux/user.reducer';
import { signup } from '../../redux/user.action';
import { ValidationService } from '../../service/validation.service';
import { APIService } from '../../service/api.service';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { AddUserValidation } from '../../model/addUser.validate.model';
import { updateUserValidate } from '../../model/updateUser.validate.model';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css'
})
export class AddUserModalComponent implements OnInit {
  
  confirmPassword:string;
  showConfirmPassword:boolean=false
  showPassword:boolean=false;
  
  constructor(private store:Store<UserState>,public dialogRef: MatDialogRef<AddUserModalComponent>,
    private http: HttpClient,private apiService:APIService,public addUserValidate:AddUserValidation,
    @Inject(MAT_DIALOG_DATA) public data: any,private validation:ValidationService) 
    {
      this.addUserValidate=new AddUserValidation();
    }
  ngOnInit(): void {
    if(this.data.action==='add'){
      this.data.userData=new User();
    }
  }
  onSubmit(userData:User):any {
   
    let isValueValid=this.validation.validatingUser(this.addUserValidate,userData,this.confirmPassword);
    if(this.data.action==='add'){
      if(isValueValid){
        this.apiService.addUserV2(userData).subscribe(() => {
          console.log('Added!');
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.validation.handleExistedInformationError(this.addUserValidate,error);
           return error;
        }
        );
      }
    }
    if(this.data.action==='update'){
      isValueValid=this.validation.validatingUserForUpdate(this.addUserValidate,userData);
      if(isValueValid){
        this.apiService.updateUserV2(userData).subscribe(
          () => {
            console.log('Updated!');
            this.dialogRef.close(true);
          },
          (error: any) => {
            this.validation.handleExistedInformationError(this.addUserValidate,error);
            return error;
          }
        );
      }
      else{
        console.log('invalid');
        return;
      }
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword=!this.showConfirmPassword;
  }
}
