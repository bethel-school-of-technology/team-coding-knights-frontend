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
   constructor(private router: Router, private http: HttpClient) { 
      //TODO: Replace with real code
      this.http.get(`${environment.db_root}/users`).toPromise().then((value)=>{
        const user = value["76e87160-724b-442c-a6b5-9e77104a8f04"];
        this.setUser(user);
        this.setAuthenicated(true);
      });

   }
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
   public async getAccessTokenSilently(): Promise<string|null> {
    return null;
    // throw new Error("Method is not implemented");
   }
   public async login(request: { email: string, password: string }): Promise<void> {
     throw new Error("Method is not implemeted");
   }
   public async logout(): Promise<void> {
     throw new Error("Method is not implemeted");
   }
   public async register(user: RegisterForm): Promise<void> {

        throw new Error("Method not implemeted");
        //TODO: send register request to server await new client info
        const request = await this.http.post<User>(`${environment.db_root}/api/register`,user).toPromise();
        
        this.setUser(request);
        this.setAuthenicated(true);

        this.router.navigateByUrl(`/account/${user.id}`);
   }
   private setUser(profile: User): void {
       this.user.next(profile);
   }
   private setAuthenicated(value: boolean) {
       this.isAuthenicated.next(value);
   }
 }