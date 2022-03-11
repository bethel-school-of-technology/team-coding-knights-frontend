import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public email = new FormControl("",[Validators.required,Validators.email]);
  public firstName = new FormControl("",[Validators.required]);
  public lastName = new FormControl("",[Validators.required]);
  public zipCode = new FormControl(undefined,[Validators.required, Validators.pattern(/\d{5}(?:\d{4})?/)]);
  public phoneNumber = new FormControl(undefined,[Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]);
  public password = new FormControl("",[Validators.required]);
  public psd_check = new FormControl("",[Validators.required, ]);
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.psd_check.valueChanges.subscribe((value)=>{
      console.log(value);
      if(value !== this.password.value) {
        this.psd_check.setErrors({ "matching": true });
        return;
      } 
      this.psd_check.setErrors(null);
    });
  }
  public getZipCodeError(){
    if (this.zipCode.hasError('required')) {
      return 'You must enter a value';
    }
    return "Invaild Zip Code";
  }
  public getPhoneNumberError(){
    if (this.phoneNumber.hasError('required')) {
      return 'You must enter a value';
    }
    return "Invaild Phone number";
  }
  public getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  public getPsdCheckErrorMessage() {
    if(this.psd_check.hasError("required")) {
      return 'You must enter a value';
    }

    return this.psd_check.hasError("matching") ? "Passwords do not match" : "";
  }
  public async submitForm() {
    try {
      const request = await fetch(`${environment.db_root}api/user`, { 
        method: "POST", 
        headers: {
          "content-type": "application/json",          
        },
        body: JSON.stringify({
          user_email: this.email.value,
          user_fistName: this.firstName.value,
          user_listName: this.lastName.value,
          user_zipCode: this.zipCode.value,
          user_phoneNumber: this.phoneNumber.value,
          user_password: this.password.value
        })
      });
      const account = await request.json();

      // log new user in.

      this.router.navigate(["/account",account.user_id]);
    } catch (error) {
      console.error(error);
    }
  }
}
