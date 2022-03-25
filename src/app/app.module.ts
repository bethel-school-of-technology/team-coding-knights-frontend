import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

import { LoginComponent } from './login/login.component';
import { AppMaterialModule } from './modules/app-material/app-material.module';

import { QuotesComponent } from './quotes/quotes.component';


import { RegisterPageComponent } from './register-page/register-page.component';

import { UserAccountService } from './services/UserAccount/user-account.service';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    QuotesComponent,
    RegisterPageComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppMaterialModule,
    NavbarModule
  ],
  providers: [
    UserAccountService
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
