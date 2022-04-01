import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccountService } from '../UserAccount/user-account.service';
import { environment } from 'src/environments/environment';
import type { IQuote } from 'src/app/models/quote.object';

interface i_quote {
  quote_measurement: number
  quote_price: number
  user_comments: string
  quote_material: string
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient, private user: UserAccountService) { }

  public async save(quote:i_quote){
    const token = await this.user.getAccessTokenSilently();

    const request = this.http.post(`${environment.db_root}/quote`,quote, { headers: {
      "Authorization": `Bearer ${token}`
     }
    }) 
    request.subscribe(console.log)
  }
  
  public async deleteQuoteById(quote_id: number): Promise<boolean> {
    try {
      const token = await this.user.getAccessTokenSilently();

      await this.http.delete<void>(`${environment.db_root}/quote/${quote_id}`,{ 
        headers: {
        "Authorization": `Bearer ${token}`
      } }).toPromise();
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  /**
   * Gets all quotes that are current user. 
   * Uses the accessToken token of the active user 
   */
  public async getQuotesOfUser(): Promise<IQuote[]> {
    const token = await this.user.getAccessTokenSilently();
    const user = this.user.getUser();

    return this.http.get<IQuote[]>(`${environment.db_root}/quotes/user/${user.user_id}`, { 
      headers: {
        "Authorization": `Bearer ${token}`
      } 
    }).toPromise();
  }
}
