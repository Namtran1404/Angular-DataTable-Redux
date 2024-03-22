import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EndpointService } from './endpoint.service';
@Injectable({
    providedIn: 'root' // or specify a specific module if desired
  })
export class APIService {
    authService:AuthService;
    private baseUrl:string;
  constructor(private http: HttpClient, private router: Router,@Inject(PLATFORM_ID) private platformId: Object,private endpointService:EndpointService) 
  {
    this.baseUrl=endpointService.getUserUrl();
  }
  
  getUsersAPI(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
      .pipe(
        map(response => response), // No need for unnecessary JSON parsing
        catchError(this.handleError) // Handle errors gracefully
      );
  }
  addUserV2(user:User):any{ 
    return this.http.post<User>(this.baseUrl, user);
  }
  addUser(user: User):any {
    this.http.post<User>(this.baseUrl, user).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        // Handle success, if needed
        return response;
      },
      (error) => {
       return error;
      }
    );
  }
  updateUser(user:User):any{
    this.http.put<User>(this.baseUrl, user).subscribe(
      (response) => {
        console.log('User update successfully:', response);
        // Handle success, if needed
        return response;
      },
      (error) => {
       return error;
      }
    );
  }
  updateUserV2(user:User):any{
    return this.http.put<User>(this.baseUrl, user);
  }
    deleteUser(id: number): Observable<any> {
        const url=this.baseUrl+'/'+id;
        return this.http.delete<any>(url);
    }
    getProtectedData(url: string): Observable<any> {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
      return this.http.get(url, { headers });
    }


    getTokenFromLocalStorage(): string | null {  
      const token = localStorage.getItem('access_token');
      return token !== null ? token : null;  
    }
    getTokenFromSessionStorage():string|null{
      const token=sessionStorage.getItem('access_token');
      return token!==null?token:null;
    }
    
  
    private handleError(error: any) {
      if (error.error?.message === 'Unauthorized' || error.status === 401) {
        console.error('Unauthorized access. Token might be missing or invalid.');
      } else {
        // ... handle other errors
      }
      return throwError(error);
    }
}