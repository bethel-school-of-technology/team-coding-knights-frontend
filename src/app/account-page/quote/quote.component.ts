import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import type { IQuote } from 'src/app/models/quote.object';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @Input()
  public onDelete: (id: number) => void;
  @Input()
  public quote: IQuote;
  public name: string = "Quote Name";
  public contractor: string = "Contractor Name";
  @ViewChild("content")
  content: ElementRef;
  private _open: boolean = false;
  constructor() { }

  ngOnInit(): void {}

  public deleteQuote() {
      this.onDelete(this.quote.quote_id);
  }

  public getMaterialList(){
    return this.quote.quote_material.split(",");
  }

  public viewContent(){
    this.content.nativeElement.classList.toggle("d-none");
    this._open = !this._open;
  }
}
