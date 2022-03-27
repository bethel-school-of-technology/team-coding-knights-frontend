import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractors-page',
  templateUrl: './contractors-page.component.html',
  styleUrls: ['./contractors-page.component.scss']
})
export class ContractorsPageComponent implements OnInit {

  constructor(private router:Router) { }

  routeTo(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }

}
