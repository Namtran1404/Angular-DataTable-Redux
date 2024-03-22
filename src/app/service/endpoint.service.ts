import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private readonly baseUrl = 'https://localhost:7190/api';

  constructor() {}

  getUserUrl(): string {
    return `${this.baseUrl}/User`;
  }
  getUserAuthUrl():string{
    return `${this.baseUrl}/User/auth`;
  }

  // Add methods for other API endpoints as needed
}
