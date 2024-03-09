import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, input } from '@angular/core';
import { User } from '../user.model';
import { UserState } from '../user.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectUserList } from '../user.selector';
import { MatDialog } from '@angular/material/dialog';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';
import { deleteUser, signup } from '../user.action';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};


  dtTrigger: Subject<any> = new Subject<any>();
  users: User[] = [];
  userId:number;


  constructor(private store: Store<UserState>,private router:Router,public dialog: MatDialog){}
  openDialog(requestedDeleteId:number,userDeleteUsername:string): void {
    const dialogRef = this.dialog.open(DeletemodalComponent, {
      width: '250px',
      data: { title: 'Confirm Deletion', content: 'Do you want to delete user '+userDeleteUsername}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Thực hiện hành động xóa người dùng ở đây
        console.log('User deleted id='+requestedDeleteId);
        this.store.dispatch(deleteUser({ userId:requestedDeleteId }));
        this.rerender();
        console.log(this.users.length+" User left");
      } else {
        console.log('User deletion cancelled');
      }
    });
  }
  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '500px',
      data: { title: 'Add User', content: 'Add a new user' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Thực hiện hành động thêm người dùng ở đây
        console.log('User added:', result.username);
        this.store.dispatch(
          signup({
            username: result.username,
            password: result.password,
            email: result.email,
            phonenumber: result.phonenumber,
          })
          
        ); this.rerender(); 

        
      } else {
        console.log('User addition cancelled');
      }
    });
  }
  ngOnInit() {
    this.dtOptions = {
    //deferRender: true, only need with big data set
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15,20],
      
    };
    
    this.generateUserRedux();
    this.getUsers();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
    
  }
  
  generateUsers() {
    for (let i = 1; i <= 99; i++) {
      const user: User = {
        id: i,
        username: `User ${i}`,
        email: `user${i}@example.com`,
        phonenumber: `123-456-789${i}`,
        password: ''
      };
      this.users.push(user);
  }
}
  generateUserRedux(){
      for (let i = 1; i <= 99; i++) {
        const user: User = {
          id: i,
          username: `User ${i}`,
          email: `user${i}@example.com`,
          phonenumber: `123-456-789${i}`,
          password: ''
        };
        this.store.dispatch(signup({username: user.username,
          password: user.password,
          email: user.email,
          phonenumber: user.phonenumber,}))
      }
    
  }

  getUsers(){
      this.store.pipe(select(selectUserList)).subscribe((users:any)=>{
        this.users=users;
      });
  }
}
