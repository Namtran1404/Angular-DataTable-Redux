export class AddUserValidation {
    constructor() {
      this.isUsernameValid = true;
      this.isPasswordValid = true;
      this.isConfirmPasswordValid = true;
      this.isEmailValid = true;
      this.isPhoneNumberValid = true;
      this.isUsernameExisted = false;
      this.isEmailExisted = false;
      this.isPhoneNumberExisted = false;
    }
  
    isUsernameValid: boolean;
    isPasswordValid: boolean;
    isConfirmPasswordValid: boolean;
    isEmailValid: boolean;
    isPhoneNumberValid: boolean;
    isUsernameExisted: boolean;
    isEmailExisted: boolean;
    isPhoneNumberExisted: boolean;
  }