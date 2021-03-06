import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quoteservice/quote-service.service';
import { UserAccountService } from 'src/app/services/UserAccount/user-account.service';
import { MaterialsService, type Material } from 'src/app/services/Materials/materials.service';

import type { IQuote } from 'src/app/models/quote.object';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  public quotesList: IQuote[] = [];
  public materials: Material[] = [];
  constructor(private quotes: QuoteService, private accountService: UserAccountService, private materialsService: MaterialsService) { }

  ngOnInit(): void {
    this.accountService.isAuthenicated.subscribe(this.fetchQuotes.bind(this));

    this.materialsService.getMaterials().then(value=>{
      this.materials = value;
    });
  }

  public deleteQuote = async (id: number) => {
    try {
      await this.quotes.deleteQuoteById(id);
      this.quotesList = this.quotesList.filter(value=>value.quote_id !== id);
    } catch (error) {
      console.error(error);
    }
  }

  private async fetchQuotes(authenicated: boolean){
    try {
      if(!authenicated) return;
      const quotes = await this.quotes.getQuotesOfUser();
      
      this.quotesList = quotes;
    } catch (error) {
      console.error(error);
    }
  }
}
