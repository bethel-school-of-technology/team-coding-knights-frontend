import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.object';
import { ContractorsService } from '../services/contractors.service';



@Component({
  selector: 'app-contractors-list',
  templateUrl: './contractors-list.component.html',
  styleUrls: ['./contractors-list.component.scss']
})


export class ContractorsListComponent implements OnInit {

    listOfContractors: User[] = [];

  constructor(private myContractorsService: ContractorsService,private router: Router) { }

  ngOnInit(): void {
    this.myContractorsService.getAllContractors().subscribe(response => {
      console.log(response);
      this.listOfContractors = response;
    });
  }
  getQuote(){
    this.router.navigateByUrl("/quotes");
  }
}