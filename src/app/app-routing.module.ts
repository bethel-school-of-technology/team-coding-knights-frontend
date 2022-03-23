import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { ContractorsPageComponent } from './contractors-page/contractors-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AccountPageComponent } from './account-page/account-page/account-page.component';

import { AccountGuard } from './guards/account.guard';


const routes: Routes = [

  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterPageComponent },
  { path: "", component: MainPageComponent },
  { path: "contractorspage", component: ContractorsPageComponent},
  { path: "account/:id", component: AccountPageComponent, canActivate: [AccountGuard] }

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
