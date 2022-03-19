/**
 * @author Arthur Lattin
 */

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


  constructor(private fb: FormBuilder) {
      this.createLoginForm();
   }

   createLoginForm() {
     this.loginForm = this.fb.group({
       username: ['', Validators.required],
       password: ['', Validators.required]
     });
   }

  ngOnInit(): void {
  }
  login() {
    this.loginError = '';
  }
}
