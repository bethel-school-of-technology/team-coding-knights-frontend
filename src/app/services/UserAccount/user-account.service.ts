/**
 * @author Collin Blosser
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../environments/environment";
import type { User } from '../../models/user.object';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  public user: BehaviorSubject<User | undefined> = new BehaviorSubject(undefined);
  /**
   * @see https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
   * @type {BehaviorSubject<boolean>}
   * @memberof UserAccountService
   */
  public isAuthenicated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
  /**
   * Returns the current user's jwt for use in calls to the backend
   *
   * @memberof UserAccountService
   */
  public async getAccessTokenSilently(): Promise<void> {
    throw new Error("Method is not implemented");
  }
  public async login(email: string, password: string): Promise<void> {
    throw new Error("Method is not implemeted");
  }
  public async logout(): Promise<void> {
    throw new Error("Method is not implemeted");
  }
}
