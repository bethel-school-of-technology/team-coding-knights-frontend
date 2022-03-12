import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.object';
import { UserAccountService } from 'src/app/services/UserAccount/user-account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public user: User | undefined = undefined;
  constructor(public account: UserAccountService, private router: Router) { }
  ngOnInit(): void {
    this.account.user.subscribe((value)=>{
      this.user = value;
    });
  }
  public routeToAccountPage(): void {
    this.router.navigate(["/account",this.user?.user_id]);
  }
}
