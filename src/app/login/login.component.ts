/**
 * @author Arthur Lattin
 */
import { UserAccountService } from '../services/UserAccount/user-account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
      loginError = '';
      loginForm: FormGroup;
       password: string;
      Email: string
  UserAccountService: any;


  constructor(private fb: FormBuilder, private accountService: UserAccountService) {
      this.createLoginForm();
      this.UserAccountService
   }

   createLoginForm() {
     this.loginForm = this.fb.group({
       Email: ['', Validators.required],
       password: ['', Validators.required]
     });
   }
    
  ngOnInit(): void {
  }
  login() {
    this.loginError = '';
  }
  submit() {
    this.accountService.login(this.loginForm.getRawValue());
  }
}
