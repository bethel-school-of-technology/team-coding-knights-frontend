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


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        transform: "scaleX(200px)"
      })),
      state('closed', style({
        transform: "scaleX(-200px)"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class SidenavComponent implements OnInit {
  @Input()
  public isSidenavOpen: boolean = false;
  @Input()
  public toggleSidenav: () => void;
  constructor(private account: UserAccountService) { }
  ngOnInit(): void { }
}
