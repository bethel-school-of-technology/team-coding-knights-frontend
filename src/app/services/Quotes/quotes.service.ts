import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccountService } from '../UserAccount/user-account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private accountService: UserAccountService, private http: HttpClient) { }


  public async getQuotesByUser(user: number): Promise<any[]> {
    const token = await this.accountService.getAccessTokenSilently();


    return this.http.get<any[]>(`${environment.db_root}/quotes?user.${user}}`, { 
      headers: {
        "Authorization": `Bearer ${token}`
      } 
    }).toPromise();
  }
}
