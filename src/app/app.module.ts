import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user.reducer';
import { SignupComponent } from './signup/signup.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { UpdateUserModalComponent } from './update-user-modal/update-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserDetailComponent,
    ManagementComponent,
    DeletemodalComponent,
    AddUserModalComponent,
    UpdateUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule,
    StoreModule.forRoot({ users: userReducer }),
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DataTablesModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
