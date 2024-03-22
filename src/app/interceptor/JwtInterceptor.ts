import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    else{
      const refresh_token=this.authService.getRefreshToken();
      if(refresh_token){
        const helper=new JwtHelperService();
        const decodedToken = helper.decodeToken(refresh_token);
        const username=decodedToken.username; 
        const password=decodedToken.password;
        this.authService.refreshTokenLogin(username,password);
      }
    }
    return next.handle(request);
    
  }
}
