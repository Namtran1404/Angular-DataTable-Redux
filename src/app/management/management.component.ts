import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, input } from '@angular/core';
import { User } from '../model/user.model';
import { UserState } from '../redux/user.reducer';
import { Store, select, union } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { throwError } from 'rxjs';
import { APIService } from '../service/api.service';
import { AuthService } from '../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ManagementPageSetting } from './management.page.setting';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements AfterViewInit, OnInit, OnDestroy {

  pageSetting:ManagementPageSetting;
  currentUserRole: string;
  currentUserName:string;
  users: User[] = [];
  constructor(private store: Store<UserState>, private router: Router, public dialog: MatDialog, public apiService: APIService, public authService: AuthService) {
    
    this.pageSetting=new ManagementPageSetting([1,2,3,4,5],5);
    const token=this.apiService.getTokenFromSessionStorage();
    //decodeToken lấy thông tin người dùng.
    if(token){
      const helper=new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.currentUserRole=decodedToken.role;
      console.log('current role = ',this.currentUserRole);
      this.currentUserName=decodedToken.username;
    }
    
  }
  ngOnInit() {
    this.getUsersData();
    
  }
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {}
  getUsersData() {
     this.apiService.getUsersAPI().subscribe(
      (response) => {
        const usertemp: User[] = JSON.parse(JSON.stringify(response));
        this.users = usertemp;
        this.pageSetting.totalPages = Math.ceil(this.users.length / this.pageSetting.pageSize);
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          console.error('Unauthorized access. Token might be invalid');
          this.authService.logout();
          this.router.navigate(['/auth/login']); 
        } else {}
        return throwError(error); 
      });
  }
  openDeleteDiaglog(userToDelete: User): void {
    const dialogRef = this.dialog.open(DeletemodalComponent, {
      width: '250px',
      data: { title: 'Confirm Deletion', content: userToDelete }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.getUsersData();
      }
      else {
        console.log('User deletion cancelled');
      }
    });
  }
  openUserDialog(action: string, userData?: any): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      data: { action: action, userData: userData }
    });

    dialogRef.afterClosed().subscribe(async result => {
      // Xử lý kết quả khi modal đóng
      if (result) {
        this.getUsersData();
      }
      else{
        this.getUsersData();   
      }
    });
  }

  navigateToLogin() {this.router.navigate(['/auth/login']);}
  logout() {this.authService.logout();this.router.navigate(['/auth/login']);}
}
