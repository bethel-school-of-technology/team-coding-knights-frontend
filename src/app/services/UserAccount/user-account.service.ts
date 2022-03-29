/**
 * @author Collin Blosser
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import type { User } from '../../models/user.object';
import type { RegisterForm } from '../../models/register-form.object';

interface AuthenicatedUser {
  access_token: string;
  profile: User;
}
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
   constructor(private router: Router, private http: HttpClient) { }

   public getUser(): User | undefined {
    return this.user.getValue()
   }
   public getIsAuthenicated(): boolean {
     return this.isAuthenicated.getValue();
   }
   /**
    * Returns the current user's jwt for use in calls to the backend
    *
    * @memberof UserAccountService
    */
   public async getAccessTokenSilently(): Promise<string | null> {
      return localStorage.getItem("auth.token");
   }
   public async login(request: { email: string, password: string }): Promise<void> {
      try {
        const data = await this.http.post<AuthenicatedUser>(`${environment.db_root}/login`,request).toPromise();

        this.setToken(data.access_token);
        this.setUser(data.profile);
        this.setAuthenicated(true);

        const sub = this.router.routerState.root.queryParams.subscribe(value=>{
          switch (value?.state) {
            case "account":
              this.router.navigateByUrl(`/account/${data.profile.user_id}`);
              break;
            case "quote":
              this.router.navigateByUrl("/quote");
              break;
            default:
              this.router.navigateByUrl("");
              break;
          }
        });

        sub.unsubscribe();
      } catch (error) {
          console.error(error);
      }
   }
   public async logout(): Promise<void> {
      this.setAuthenicated(false);
      this.setToken(null);
      this.setUser(undefined);
      this.router.navigateByUrl("");
   }
   public async register(user: RegisterForm): Promise<void> {
        try {
          const request = await this.http.post<AuthenicatedUser>(`${environment.db_root}/register`,user).toPromise();
        
          this.setToken(request.access_token);
          this.setUser(request.profile);
          this.setAuthenicated(true);

          this.router.navigateByUrl(`/account/${request.profile.user_id}`);
        } catch (error) {
          console.error(error);
        }
   }
   public async editUser(user: { email: string, phone: number, zip: number, first_name: string, last_name: string }): Promise<boolean> {
      try {
          const token = await this.getAccessTokenSilently();

          const request = await this.http.put<User>(`${environment.db_root}/user/${this.getUser().user_id}`,user, { 
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            } 
          }).toPromise();

          this.setUser(request);

          return true;
      } catch (error) {
        console.error(error);
        return false;
      }
   }
   /**
    * handles the setting and removable of the JWT from localStorage
    */
   private setToken(token: string | null): void {
     if(!token) {
        localStorage.removeItem("auth.token");
        return;
     }

     localStorage.setItem("auth.token",token);
   }
   /**
    * updates the user prop to the give value
    */
   private setUser(profile: User | undefined): void {
       this.user.next(profile);
   }
   /**
    * updates the isAuthenicated props to a new value
    */
   private setAuthenicated(value: boolean) {
       this.isAuthenicated.next(value);
   }

 }