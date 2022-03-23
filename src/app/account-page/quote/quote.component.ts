import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IQuote } from 'src/app/models/quote.object';
import { QuotesService } from 'src/app/services/Quotes/quotes.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @Input()
  public quote: IQuote;
  public name: string = "Quote Name";
  public contractor: string = "Contractor Name";
  @ViewChild("content")
  content: ElementRef;
  private _open: boolean = false;
  constructor(private quoteService: QuotesService ) { }

  ngOnInit(): void {}

  public deleteQuote() {
      try {
        this.quoteService.deleteQuoteById(this.quote.quote_id);
      } catch (error) {
        console.error(error);
      }
  }

  public viewContent(){
    if(!this._open) {
      this.content.nativeElement.style.display = "flex";
      this._open = true;
    } else {
      this.content.nativeElement.style.display = "none";
      this._open = false;
    }
  }
}
