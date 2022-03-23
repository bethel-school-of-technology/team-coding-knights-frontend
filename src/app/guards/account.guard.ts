import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserAccountService } from '../services/UserAccount/user-account.service';
import { type ActivatedRouteSnapshot, type CanActivate, Router, type RouterStateSnapshot, type UrlTree } from '@angular/router';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(private accountService: UserAccountService, private router: Router){}
  /**
   * @see https://youtu.be/NxidP4I9EHE?t=560
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.isAuthenicated.pipe(map(loggedIn => loggedIn ? loggedIn : this.router.createUrlTree(["login"])));
  }
  
}
