import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserList } from './user.selector';
import { UserState } from './user.reducer';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private store: Store<UserState>) {}

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{9,}$/; // Regex for phone number, at least 10 digits

    return phoneRegex.test(phoneNumber);
  }

  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  }

  validateUsername(username: string): boolean {
    let isUsernameValid = true;

    this.store.select(selectUserList).subscribe((userList) => {
      const existingUser = userList.find((user) => user.username === username);
      if (existingUser) {
        isUsernameValid = false;
      }
    });

    return isUsernameValid;
  }

  validatePassword(password: string): boolean {
    const passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordPattern.test(password);
  }
}