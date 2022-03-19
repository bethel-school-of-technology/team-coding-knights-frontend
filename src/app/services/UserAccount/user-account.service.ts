/**
 * @author Collin Blosser
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
   constructor(private router: Router, private http: HttpClient) { }
   /**
    * Returns the current user's jwt for use in calls to the backend
    *
    * @memberof UserAccountService
    */
   public async getAccessTokenSilently(): Promise<void> {
     throw new Error("Method is not implemented");
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