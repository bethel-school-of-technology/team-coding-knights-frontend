import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 
  @Input()
  public onDelete: (index: number) => void = ()=>{};
  @Input()
  public reCalc: () => void = ()=>{};
  @Input()
  public index: number = -1;
  @Input()
  public itemData: any = undefined;
  public formControl = new FormControl(0);
  public formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

  constructor() { }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(()=>{
      this.reCalc();
    });
  }
  public calc(): number {
    return this.itemData.material_price * this.formControl.value;
  }
  public removeSelf(){
    this.onDelete(this.index);
  }
}
