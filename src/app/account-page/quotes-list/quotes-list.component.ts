import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/Quotes/quotes.service';
import { UserAccountService } from 'src/app/services/UserAccount/user-account.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.scss']
})
export class QuotesListComponent implements OnInit {
  public quotesList: any[] = [];
  constructor(private quotes: QuotesService, private accountService: UserAccountService) { }

  ngOnInit(): void {
    this.accountService.isAuthenicated.subscribe(this.fetchQuotes.bind(this));
  }
  private async fetchQuotes(authenicated: boolean){
    try {
      if(!authenicated) return;
      const user = this.accountService.user.getValue();

      const quotes = await this.quotes.getQuotesByUser(user.user_id);
      this.quotesList = quotes;

      console.log(quotes);

    } catch (error) {
      console.error(error);
    }
  }
}
