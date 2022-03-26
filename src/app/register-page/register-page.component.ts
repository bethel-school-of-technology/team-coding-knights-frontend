import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../services/UserAccount/user-account.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public userForm = new FormGroup({
    email: new FormControl(undefined,[Validators.required,Validators.email]),
    firstName: new FormControl(undefined,[Validators.required]),
    lastName: new FormControl(undefined,[Validators.required]),
    zipCode: new FormControl(undefined,[Validators.required,Validators.pattern(/\d{5}(?:\d{4})?/)]),
    phoneNumber: new FormControl(undefined,[Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
    password: new FormControl(undefined,[Validators.required])
  });
  public psd_check = new FormControl(undefined,[Validators.required]);
  constructor(private accountService: UserAccountService) { }
  ngOnInit(): void {
  this.psd_check.valueChanges.subscribe((value)=>{
      if(value !== this.userForm.get("password").value) {
        this.psd_check.setErrors({ "matching": true });
        return;
      } 
      this.psd_check.setErrors(null);
    });
  }
  public getZipCodeError(){
    if (this.userForm.hasError("required","zipCode")) {
      return 'You must enter a value';
    }
    return "Invaild Zip Code";
  }
  public getPhoneNumberError(){
    if (this.userForm.hasError("required","phoneNumber")) {
      return 'You must enter a value';
    }
    return "Invaild Phone number";
  }
  public getEmailErrorMessage() {
    if (this.userForm.hasError('required',"email")) {
      return 'You must enter a value';
    }
    return this.userForm.hasError('email',"email") ? 'Not a valid email' : '';
  }
  public getPsdCheckErrorMessage() {
    if(this.psd_check.hasError("required")) {
      return 'You must enter a value';
    }

    return this.psd_check.hasError("matching") ? "Passwords do not match" : "";
  }
  public submitForm() {
    this.accountService.register(this.userForm.getRawValue());
  }
}
