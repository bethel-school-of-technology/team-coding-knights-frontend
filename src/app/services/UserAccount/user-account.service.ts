/**
 * @author Collin Blosser
 * 
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor() { }

  public isAuthenicated(): boolean {
    return false;
  }
}
