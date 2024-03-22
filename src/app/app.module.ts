import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './redux/user.reducer';
import { SignupComponent } from './auth/signup/signup.component';
import { RouterModule } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DeletemodalComponent } from './management/deletemodal/deletemodal.component';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { AddUserModalComponent } from './management/add-user-modal/add-user-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APIService } from './service/api.service';
import { JwtInterceptor } from './interceptor/JwtInterceptor';
import { AuthComponent } from './auth/auth.component';
import { AddUserValidation } from './model/addUser.validate.model';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ManagementComponent,
    DeletemodalComponent,
    AddUserModalComponent,
    AuthComponent,
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
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),APIService,AddUserValidation,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
