import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { ContractorsPageComponent } from './contractors-page/contractors-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { QuoteComponent } from './quotes/quotes.component';
import { ContractorsListComponent } from './contractors-list/contractors-list.component';
import { AccountPageComponent } from './account-page/account-page/account-page.component';
import { QuoteEditComponent } from "./quote-edit/quote-edit.component";

import { AccountGuard } from './guards/account.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterPageComponent },
  { path: "", component: MainPageComponent },
  { path: "contractorspage", component: ContractorsPageComponent},
  { path: "quotes", component: QuoteComponent, canActivate: [AccountGuard]},
  { path: "account/:id", component: AccountPageComponent, canActivate: [AccountGuard] },
  { path: "contractors", component: ContractorsPageComponent},
  { path: "contractorslist", component: ContractorsListComponent},
  { path: "quote/edit/:id", component: QuoteEditComponent }
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
