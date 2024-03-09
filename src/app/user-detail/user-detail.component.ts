import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoggedUser } from '../user.selector';
import { logout } from '../user.action';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  loggedUser: any;
  username:string;
  constructor(private store: Store,private router:Router) {}

  ngOnInit() {
    this.store.pipe(select(selectLoggedUser)).subscribe((user: any) => {
      this.loggedUser = user;
      this.username=user.username;
    });
  }
   onLogout(){
    this.store.dispatch(logout());
    this.router.navigate(['login']);
  }
  
}