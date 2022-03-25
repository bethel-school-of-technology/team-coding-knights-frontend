import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { ContractorsPageComponent } from './contractors-page/contractors-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { QuotesComponent } from './quotes/quotes.component';


const routes: Routes = [

  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterPageComponent },
  { path: "", component: MainPageComponent },
  


  { path: "contractors", component: ContractorsPageComponent},




  { path: "quotes", component: QuotesComponent},

 // { path: "", redirectTo: "loginpage", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
