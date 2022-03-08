/**
 * @author Collin Blosser
 * 
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  username: string = "TEMPNAME";
  constructor() { }

  public isAuthenicated(): boolean {
    return true;
  }
}
