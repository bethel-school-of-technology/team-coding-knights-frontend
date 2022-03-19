import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorsPageComponent } from './contractors-page/contractors-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  { path: "login", component: LoginComponent},

  { path: "mainpage", component: MainPageComponent},

  { path: "contractorspage", component: ContractorsPageComponent},

 // { path: "", redirectTo: "loginpage", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
