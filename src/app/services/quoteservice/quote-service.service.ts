import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccountService } from '../UserAccount/user-account.service';
import { environment } from 'src/environments/environment';

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
}
