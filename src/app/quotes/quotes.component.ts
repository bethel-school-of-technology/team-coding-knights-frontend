import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms'

interface Material {
  material_id: number;
  material_name: string;
  material_price: number;
  material_set_date: Date;
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  materialControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  materials: Material[] = [
    {material_id: 0, material_name: 'Hardwood', material_price: 1.00, material_set_date: new Date() },
    {material_id: 0, material_name: 'Carpet', material_price: 4.00, material_set_date:  new Date()  },
    {material_id: 0, material_name: 'Hardwood', material_price: 1.00, material_set_date: new Date() },
    {material_id: 0, material_name: 'Hardwood', material_price: 1.00, material_set_date: new Date() },
  ]


  constructor() { }

  ngOnInit(): void {
   // http request 
  }

}