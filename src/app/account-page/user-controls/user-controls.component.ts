import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/UserAccount/user-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss']
})
export class UserControlsComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    email: new FormControl(undefined,[Validators.required,Validators.email]),
    phone: new FormControl(undefined,[Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
    zip: new FormControl(0,[Validators.pattern(/\d{5}(?:\d{4})?/)]),
    first_name: new FormControl(),
    last_name: new FormControl()
  });
  constructor(private accountService: UserAccountService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.accountService.user.subscribe(user=>{
      this.userForm.setValue({ 
        email: user.user_email,
        phone: user.user_phone_number,
        zip: user.user_zip_code,
        first_name: user.user_first_name,
        last_name: user.user_last_name
      });
    });

  }

  public async submit() {
    const {email,phone,zip,first_name,last_name} = this.userForm.getRawValue();

    const res = await this.accountService.editUser({
      email,
      first_name,
      last_name,
      zip: Number(zip),
      phone: Number(phone)
    });

    
    if(res) {
      this._snackBar.open("Profile saved", "Ok", { 
        duration: 3000,
        horizontalPosition: "right",
        panelClass: ["snack-bg-dark","text-success"],
       });
    } else {
      this._snackBar.open("Failed to save profile", "Ok", { 
        duration: 3000 ,
        horizontalPosition: "right",
        panelClass: ["snack-bg-dark","text-danger"]
      });
    }

  }

}
