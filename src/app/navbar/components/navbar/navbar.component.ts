import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserAccountService } from '../../../services/UserAccount/user-account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public userAuthenicated: boolean = false;
  public isSidenavOpen: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches),shareReplay());
  constructor(private account: UserAccountService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.userAuthenicated = this.account.isAuthenicated();
  }
  public routeTo(link: string): void {
    this.router.navigate([link]);
  }

  public toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

}
