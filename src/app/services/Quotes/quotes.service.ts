import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccountService } from '../UserAccount/user-account.service';
import { environment } from 'src/environments/environment';

import type { IQuote } from 'src/app/models/quote.object';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private accountService: UserAccountService, private http: HttpClient) { }

  public async deleteQuoteById(quote_id: number) {
    try {
      const token = await this.accountService.getAccessTokenSilently();

      await this.http.delete<void>(`${environment.db_root}/quote/${quote_id}`,{ 
        headers: {
        "Authorization": `Bearer ${token}`
      } }).toPromise();
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Gets all quotes that are current user. 
   * Uses the accessToken token of the active user 
   */
  public async getQuotesOfUser(): Promise<IQuote[]> {
    const token = await this.accountService.getAccessTokenSilently();
    const user = this.accountService.getUser();

    return this.http.get<IQuote[]>(`${environment.db_root}/quotes/user/${user.user_id}`, { 
      headers: {
        "Authorization": `Bearer ${token}`
      } 
    }).toPromise();
  }
}
