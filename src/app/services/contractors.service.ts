import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contractors } from '../models/contractors';

@Injectable({
  providedIn: 'root'
})
export class ContractorsService {

  myContractorURL: string = "http://localhost:3000/contractors"

  constructor(private http: HttpClient) { }

  //list of contractors//
  getAllContractors(): Observable<Contractors[]>{
    return this.http.get<Contractors[]>(this.myContractorURL)
  }
 


}
