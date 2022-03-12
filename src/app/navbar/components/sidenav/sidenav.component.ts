import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { UserAccountService } from '../../../services/UserAccount/user-account.service';
import { User } from 'src/app/models/user.object';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: "translate3d(0, 0, 0)"
      })),
      state('closed', style({
        transform: "translate3d(-400px, 0, 0)",
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class SidenavComponent implements OnInit {
  @Input()
  public isSidenavOpen: boolean = false;
  @Input()
  public toggleSidenav: () => void;
  public user: User | undefined = undefined;
  public isAuthenicated: boolean = false;
  constructor(public account: UserAccountService, private router: Router) {

  }
  ngOnInit(): void { 
    this.account.isAuthenicated.subscribe((value)=>{
      this.isAuthenicated = value;
    });
    this.account.user.subscribe((value)=>{
      this.user = value;
    });
  }
  public routeTo(route: string): void {
      this.router.navigate([route]);
  }
}
