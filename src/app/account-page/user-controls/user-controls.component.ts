import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/UserAccount/user-account.service';
import type { User } from 'src/app/models/user.object';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss']
})
export class UserControlsComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    email: new FormControl(undefined,[Validators.required,Validators.email]),
    phone: new FormControl(),
    zipCode: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl()
  });
  constructor(private accountService: UserAccountService) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(user=>{
      this.userForm.setValue({ 
        email: user.user_email,
        phone: user.user_phone_number,
        zipCode: user.user_zip_code,
        first_name: user.user_first_name,
        last_name: user.user_last_name
      });
    });

  }

  public submit() {
    this.accountService.editUser(this.userForm.getRawValue())
  }

}
