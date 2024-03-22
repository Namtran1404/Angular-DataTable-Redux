import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { EndpointService } from './endpoint.service';
import { Router } from '@angular/router';
import { SessionToken } from '../model/token.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private baseUrl:string; 
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();
  private readonly sessionToken:SessionToken=new SessionToken();

  constructor(private http: HttpClient,private endpointService:EndpointService,private router:Router) {
    this.baseUrl=endpointService.getUserAuthUrl();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  refreshTokenLogin(username: string, password: string){
    this.login(username,password)
      .subscribe(
        (response) => {
          const token = response.token;
          this.setToken(token);
          const refreshToken=response.refreshToken;
          this.setRefreshToken(refreshToken);
          this.router.navigate(['management']);
        },
        (error) => {
        }
      );
  }

  setToken(token: string) {
    sessionStorage.setItem(this.sessionToken.TOKEN_KEY,token);
    this.loggedInSubject.next(true);
  }
  setRefreshToken(token:string){
    sessionStorage.setItem(this.sessionToken.REFRESH_TOKEN,token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.sessionToken.TOKEN_KEY);
  }
  getRefreshToken():string|null{
    return sessionStorage.getItem(this.sessionToken.REFRESH_TOKEN);
  }

  logout() {
    sessionStorage.removeItem(this.sessionToken.TOKEN_KEY);
    sessionStorage.removeItem(this.sessionToken.REFRESH_TOKEN);
    this.loggedInSubject.next(false); 
  }

  isLoggedIn(): boolean {
    const token=sessionStorage.getItem(this.sessionToken.TOKEN_KEY);
    return token !== null; 
  }
  
  
}
