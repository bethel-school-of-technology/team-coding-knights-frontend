import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { ContractorsPageComponent } from './contractors-page/contractors-page.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  //{ path: "loginpage", component: LoginPageComponent},
  { path: "register", component: RegisterPageComponent },
  { path: "", component: MainPageComponent },
  

  { path: "contractorspage", component: ContractorsPageComponent},
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
