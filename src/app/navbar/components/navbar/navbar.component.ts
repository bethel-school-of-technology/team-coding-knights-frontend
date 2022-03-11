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
  public isSidenavOpen: boolean = false;
  public isAuthenicated: boolean = false;
  public onSmallScreen: boolean = false;
  private isHandset: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(map(result => result.matches),shareReplay());
  constructor(private account: UserAccountService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.account.isAuthenicated.subscribe((value)=>{
      this.isAuthenicated = value;
    });
    this.isHandset.subscribe((value)=>{
      this.onSmallScreen = value;
    });
  }
  public routeTo(link: string): void {
    this.router.navigate([link]);
  }

  public toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

}
