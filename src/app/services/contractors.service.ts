import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { User } from '../models/user.object';

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {

  myContractorURL: string = environment.fake_db + "/contractors"

  constructor(private http: HttpClient) { }

  //list of contractors//
  getAllContractors(): Observable<User[]>{
    return this.http.get<User[]>(this.myContractorURL)
  }
 


}
