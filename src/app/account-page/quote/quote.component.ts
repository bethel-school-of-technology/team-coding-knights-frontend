import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  @Input()
  name: string = "Quote Name";
  @Input()
  contractor: string = "Contractor Name";
  @ViewChild("content")
  content: ElementRef;
  private _open: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  public deleteQuote() {}
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
