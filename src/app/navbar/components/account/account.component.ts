import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/services/UserAccount/user-account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public username: string = "USERNAME";
  constructor(public account: UserAccountService) { }

  ngOnInit(): void {
    this.username = this.account.username;
  }

}
