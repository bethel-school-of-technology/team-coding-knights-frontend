import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import type { IQuote } from 'src/app/models/quote.object';
import type { IMaterial } from '../../services/Materials/materials.service';

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

  @Input()
  public materials: IMaterial[] = [];
  public name: string = "Quote";
  public contractor: string = "Contractor Name";
  public formatter = Intl.NumberFormat("en-US",{ currency: "USD", style: "currency" });

  @ViewChild("content")
  content: ElementRef;

  private _open: boolean = false;
  constructor() { }

  ngOnInit(): void {}

  public deleteQuote() {
      this.onDelete(this.quote.quote_id);
  }

  public getMaterialList(){
    let items = this.quote.quote_material.split(";");

    console.log(items);

    return items.filter(value=>value.length !== 0).map(value=> { 
      const [id,amount] = value.split(":");

      const mat = this.materials.find(value=>value.material_id === Number(id))

      return { id: mat.material_name ?? "Unkown Material", amount }
    });

  }

  public viewContent(){
    this.content.nativeElement.classList.toggle("d-none");
    this._open = !this._open;
  }
}
